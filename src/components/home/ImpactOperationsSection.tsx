import { motion } from "framer-motion";
import { BarChart3, Bot, Layers3 } from "lucide-react";

export function ImpactOperationsSection() {
  return (
    <section className="relative overflow-hidden bg-[#161616]">
      <div className="absolute inset-0 bg-[linear-gradient(92deg,#1f1f1f_0%,#3b3b3b_45%,#b5b5b5_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-[1320px] bg-white px-8 py-20 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto flex min-h-[440px] w-full max-w-[760px] flex-col items-center justify-center overflow-hidden rounded-[28px] border border-transparent bg-[linear-gradient(130deg,#8d7cf6_0%,#4f46e5_52%,#3b82f6_100%)] px-8 py-12 text-center text-white shadow-[0_24px_48px_-28px_rgba(79,70,229,0.75)] md:px-12"
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
          <h2 className="relative z-10 max-w-2xl text-3xl font-light leading-[1.12] tracking-[-0.02em] text-white md:text-[38px] lg:text-[40px]">
            Good intentions aren&apos;t enough anymore. Impact happens when you have the infrastructure to execute.
          </h2>

          <div className="relative z-10 mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
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

        </motion.div>

      </div>
    </section>
  );
}
