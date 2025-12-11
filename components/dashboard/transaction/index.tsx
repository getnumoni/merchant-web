"use client";

import { Button } from "@/components/ui/button";
import { walletImage } from "@/constant/images";
import Image from "next/image";
import TransactionHistory from "./transaction-history";
import TransactionSummary from "./transaction-summary";

export default function Transaction() {

  return (
    <main>
      <section>
        <div className="relative flex bg-theme-dark-green text-white p-4 rounded-2xl flex-col justify-center overflow-hidden">
          <p className="text-sm font-medium">Next Automation Payout</p>
          <p className="text-md font-bold">10th December 2025 : 7:00 AM</p>
          <Button variant="outline" className="bg-white text-theme-dark-green border-theme-dark-green rounded-full md:w-1/8 w-1/2 mt-3">
            <p className="text-lg font-bold">Get Now</p>
          </Button>
          <Image src={walletImage} alt="wallet" width={150} height={100} className="absolute -bottom-12 -right-5" />
        </div>

        <TransactionSummary />
        <TransactionHistory />
      </section>
    </main>
  );
}