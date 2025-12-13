import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";

export default function Experience({ experience }) {
  if (!experience?.length) return null;

  return (
    <section id="experience" className="section-container py-24">
      <div className="space-y-4">
        <Badge
          variant="outline"
          className="glass rounded-full px-4 py-1 text-xs uppercase tracking-[0.25em]"
        >
          Experience
        </Badge>
        <h2 className="text-3xl font-semibold lg:text-4xl">
          Systems thinking across student leadership and freelance work.
        </h2>
      </div>
      <div className="mt-12 space-y-8">
        {experience.map((role, index) => (
          <motion.div
            key={role.title}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="flex gap-6"
          >
            <div className="flex flex-col items-center">
              <div className="h-6 w-6 rounded-full border border-white/50 bg-white/60 backdrop-blur-xl" />
              {index !== experience.length - 1 && (
                <div className="mt-2 w-px flex-1 bg-white/40 backdrop-blur-sm" />
              )}
            </div>
            <Card className="flex-1">
              <CardContent className="space-y-3 p-6">
                <p className="text-sm uppercase tracking-[6px] text-muted-foreground">
                  {role.timeframe}
                </p>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-semibold">{role.title}</h3>
                  <p className="text-base text-muted-foreground">
                    {role.organization}
                  </p>
                </div>
                <p className="text-muted-foreground">{role.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

