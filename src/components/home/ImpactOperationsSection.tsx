import { motion } from "framer-motion";

export function ImpactOperationsSection() {
  return (
    <section className="relative overflow-hidden bg-[#161616]">
      <div className="absolute inset-0 bg-[linear-gradient(92deg,#1f1f1f_0%,#3b3b3b_45%,#b5b5b5_100%)]" />

      <div className="relative z-10 mx-auto grid min-h-[640px] w-full max-w-[1320px] gap-16 px-8 py-20 lg:grid-cols-[minmax(0,1fr)_500px] lg:items-center lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex max-w-[620px] flex-col"
        >
          <h2 className="text-3xl font-light leading-[1.12] tracking-[-0.02em] text-white md:text-[38px] lg:text-[40px]">
            Good intentions aren&apos;t enough anymore. Impact happens when you have the infrastructure to execute.
          </h2>

          <div className="mt-[25px] max-w-[420px]">
            <div className="mb-5 mt-[17px] flex items-center">
              <img src="/logos/group-70-icon.png" alt="Coompass logo" className="h-10 w-10" loading="lazy" />
            </div>
            <h3 className="text-[20px] font-semibold leading-none text-white">From intention to execution</h3>
            <p className="mb-[12px] mt-[12px] pb-0 pt-0 text-xl font-light leading-[20px] text-white/75 md:text-2xl lg:text-[14px]">
              Compass gives companies the structure, visibility and control to turn impact programs into measurable action.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="flex w-full max-w-[500px] flex-col items-center justify-center pb-24 lg:pb-28"
        >
          <div className="relative z-10 w-full max-w-[460px]">
            <div className="overflow-hidden rounded-[16px] shadow-[0_26px_48px_-30px_rgba(0,0,0,0.95)]">
              <img
                src="/covers/good-intentions-report.png"
                alt="Impact report dashboard"
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="pointer-events-none absolute -bottom-[42%] -left-[10%] z-20 w-[46%] overflow-hidden rounded-[12px] shadow-[0_18px_40px_-22px_rgba(0,0,0,0.55)]">
              <img
                src="/covers/dashboard-overlap-photo-ocean.png"
                alt="Ocean cleanup activity"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="pointer-events-none absolute -bottom-[16%] -right-[10%] z-20 w-[46%] overflow-hidden rounded-[12px] shadow-[0_18px_40px_-22px_rgba(0,0,0,0.55)]">
              <img
                src="/covers/dashboard-overlap-photo.png"
                alt="Food distribution activity"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
