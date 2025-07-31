
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Linkedin } from "lucide-react";
import { toast } from "sonner";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Let's Connect
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Get In Touch</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm always interested in discussing new opportunities, research collaborations, 
                or internship opportunities. Let's build something amazing together!
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:samkitbothra11@gmail.com"
                className="flex items-center p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 group"
              >
                <Mail className="h-6 w-6 text-blue-400 mr-4 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-white font-semibold">Email</div>
                  <div className="text-gray-400">samkitbothra11@gmail.com</div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/samkit-bothra/"
                className="flex items-center p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 group"
              >
                <Linkedin className="h-6 w-6 text-blue-400 mr-4 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-white font-semibold">LinkedIn</div>
                  <div className="text-gray-400">Connect with me</div>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-gray-800/50 border-gray-700 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-3 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
              >
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};
