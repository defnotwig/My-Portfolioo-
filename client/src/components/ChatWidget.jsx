import { useState } from "react";
import { MessageCircle, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      content:
        "Hey! I’m Gabriel’s AI concierge. Drop a note and I’ll route it properly.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);

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
    <div className="fixed bottom-4 right-4 z-[9999]">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button size="lg" className="bg-foreground dark:bg-white hover:bg-foreground/90 dark:hover:bg-gray-50 text-background dark:text-black rounded-full px-6 py-6 shadow-2xl hover:shadow-3xl transition-all hover:scale-110 animate-pulse-glow font-medium">
            <MessageCircle className="mr-2 h-5 w-5" />
            Chat with Gabriel
          </Button>
        </SheetTrigger>
        <SheetContent
          className="flex h-[75vh] max-h-[500px] w-full flex-col gap-0 p-0 sm:max-w-sm bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg dark:shadow-2xl"
          title="Chat with Gabriel"
          description="Ask me about anything!"
          side="right"
        >
          <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black px-6 py-5">
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
          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6 bg-white dark:bg-black">
            {messages.map((msg, idx) => (
              <div
                key={`${msg.sender}-${idx}`}
                className={`flex ${msg.sender === "assistant" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-md ${msg.sender === "assistant"
                    ? "bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 text-foreground/90 dark:text-white/95"
                    : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium"
                    }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl px-4 py-3 text-sm bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                  <span className="text-foreground/90 dark:text-white/95">Thinking...</span>
                </div>
              </div>
            )}
          </div>
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
        </SheetContent>
      </Sheet>
    </div>
  );
}

