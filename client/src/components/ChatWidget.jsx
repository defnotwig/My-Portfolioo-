import { useState, useRef, useEffect } from "react";
import { MessageCircle, Loader2, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      content:
        "Hey! I'm Gabriel's AI concierge. Drop a note and I'll route it properly.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { sender: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await api.post("/chat", {
        message: userMessage.content,
        sessionId,
      });
      setSessionId(data.sessionId);
      setMessages((prev) => [...prev, { sender: "assistant", content: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          content: "The line is busy right now. Please try again shortly.",
        },
      ]);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button - Bottom Right, Always Visible */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        {!open && (
          <Button 
            size="lg" 
            onClick={() => setOpen(true)}
            className="bg-foreground dark:bg-white hover:bg-foreground/90 dark:hover:bg-gray-50 text-background dark:text-black rounded-full px-6 py-6 shadow-2xl hover:shadow-3xl transition-all hover:scale-110 animate-pulse-glow font-medium"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Chat with Gabriel
          </Button>
        )}
      </div>

      {/* Chat Modal - Floating on Right Side, No Background Blur */}
      <div 
        className={`fixed bottom-6 right-6 z-[9999] w-[calc(100vw-3rem)] max-w-sm transition-all duration-300 ease-out transform-gpu ${
          open 
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" 
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex h-[70vh] max-h-[500px] w-full flex-col gap-0 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl dark:shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black px-6 py-5">
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11 border-2 border-blue-500/30 shadow-lg ring-2 ring-blue-500/20">
                <AvatarImage 
                  src={document.documentElement.classList.contains('dark') ? "/images/me formal black.png" : "/images/profile.jpg"} 
                  alt="Gabriel Ludwig Rivera" 
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-bold">GLR</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <p className="text-base font-bold text-foreground">Chat with Gabriel</p>
                <p className="flex items-center gap-1.5 text-xs text-emerald-500 dark:text-emerald-400 font-medium">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full border border-gray-200 dark:border-gray-700 p-2 text-sm text-muted-foreground transition hover:text-foreground hover:bg-muted bg-white/80 dark:bg-black/80 backdrop-blur-sm"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6 bg-white dark:bg-black">
            {messages.map((msg, idx) => (
              <div
                key={`${msg.sender}-${idx}`}
                className={`flex ${msg.sender === "assistant" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-md ${msg.sender === "assistant"
                    ? "bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-foreground dark:text-white/95"
                    : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium"
                    }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl px-4 py-3 text-sm bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                  <span className="text-foreground dark:text-white/95">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={sendMessage}
            className="flex gap-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black px-4 py-4"
          >
            <Input
              placeholder="Ask me about anything!"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="rounded-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-5 py-6 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-blue-500 transition-all"
              maxLength={1000}
            />
            <Button type="submit" disabled={loading} className="bg-foreground dark:bg-white/90 text-background dark:text-gray-900 rounded-full px-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 font-medium hover:bg-foreground/80 hover:text-background dark:hover:bg-white dark:hover:text-gray-900">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

