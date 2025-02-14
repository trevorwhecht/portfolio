import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SectionHeader } from "@/components/ui/section-header"

export function ContactSection() {
  return (
    <section id="contact" className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <SectionHeader>Contact</SectionHeader>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <Textarea id="message" placeholder="Your message" rows={3} />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

