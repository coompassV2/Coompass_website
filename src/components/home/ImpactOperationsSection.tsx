import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BarChart3, Bot, Layers3 } from "lucide-react";

export function ImpactOperationsSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative z-10 mx-auto w-full max-w-[1320px] bg-white px-8 py-20 lg:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(to_right,rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.14)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.95)_42%,rgba(0,0,0,0)_100%)]"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto flex min-h-[440px] w-full max-w-[760px] flex-col items-center justify-center overflow-hidden rounded-[28px] border border-transparent bg-[linear-gradient(130deg,rgba(141,124,246,1)_0%,rgba(79,70,229,1)_68%,rgba(59,130,246,1)_100%)] px-8 py-12 text-center text-white shadow-[0_24px_48px_-28px_rgba(79,70,229,0.75)] md:px-12"
        >
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-35">
            <img
              src="/covers/impact-operations-panel-bg.png"
              alt=""
              className="h-full w-full object-cover blur-[1.5px]"
              loading="lazy"
              aria-hidden="true"
            />
          </div>
          <h2 className="relative z-10 my-[29px] max-w-2xl text-3xl font-light leading-[1.12] tracking-[-0.02em] text-white md:text-[38px] lg:text-[40px]">
            Good intentions aren&apos;t enough anymore. Impact happens when you have the infrastructure to execute.
          </h2>

          <div className="relative z-10 mt-[6px] grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center">
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Layers3 className="h-6 w-6 text-white" aria-hidden="true" />
              </motion.div>
              <h3 className="mt-3 text-lg font-semibold text-white">Centralize</h3>
            </div>

            <div className="flex flex-col items-center">
              <motion.div
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Bot className="h-6 w-6 text-white" aria-hidden="true" />
              </motion.div>
              <h3 className="mt-3 text-lg font-semibold text-white">Automate</h3>
            </div>

            <div className="flex flex-col items-center">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <BarChart3 className="h-6 w-6 text-white" aria-hidden="true" />
              </motion.div>
              <h3 className="mt-3 text-lg font-semibold text-white">Report</h3>
            </div>
          </div>

          <div className="relative z-10 mt-8">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white px-8 text-sm font-medium text-[#111827] hover:bg-white/90"
            >
              <a href="https://calendly.com/hello-coompass/sessao-coompass" target="_blank" rel="noopener noreferrer">
                Schedule demo
              </a>
            </Button>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
