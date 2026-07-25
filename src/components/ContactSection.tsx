import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Linkedin, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion";

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" data-signal-mode="pulse" className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="08"
          eyebrow="Contact"
          title="Let's build something."
          description="Open to research collaborations, internships, and new opportunities."
        />

        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="space-y-3">
              <a
                href="mailto:samkitbothra11@gmail.com"
                className="surface group flex items-center justify-between p-5 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-accent">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-medium text-foreground">Email</div>
                    <div className="text-sm text-muted-foreground">samkitbothra11@gmail.com</div>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>

              <a
                href="https://www.linkedin.com/in/samkit-bothra/"
                target="_blank"
                rel="noopener noreferrer"
                className="surface group flex items-center justify-between p-5 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-accent">
                    <Linkedin className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-medium text-foreground">LinkedIn</div>
                    <div className="text-sm text-muted-foreground">Connect with me</div>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-12 bg-card"
              />
              <Input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-12 bg-card"
              />
              <Textarea
                name="message"
                placeholder="Your message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="resize-none bg-card"
              />
              <button
                type="submit"
                className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.01]"
              >
                Send message
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
