"use client";

import { emptyBranchIcon } from "@/constant/icons";
import { motion } from "framer-motion";
import Image from "next/image";

export default function EmptyPointAllocation() {
  return (
    <main>
      <section className="flex flex-col items-center justify-center gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.2
          }}
        >
          <Image src={emptyBranchIcon} alt="Empty Branch Illustration" width={300} height={300} />
        </motion.div>

        <motion.h1
          className="text-xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: 0.4
          }}
        >
          No data yet
        </motion.h1>

        <motion.p
          className="text-sm text-gray-600 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: 0.6
          }}
        >
          No customer has interacted with your brand yet. No points have been earned, claimed, or rewarded.
        </motion.p>
      </section>
    </main>
  );
}