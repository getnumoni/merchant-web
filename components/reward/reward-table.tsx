'use client'

import { redMusicPauseIcon, warningIcon } from "@/constant/icons";
import { rewardTableData, summaryData } from "@/data";
import Image from "next/image";
import { useEffect, useState } from "react";
import RewardNotification from "./reward-notification";

export default function RewardTable() {
  const [countdown, setCountdown] = useState(30);
  const [showNotifications, setShowNotifications] = useState(false);

  //set countdown and time out. //if countdown is 0, pause notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 0) {
          setShowNotifications(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <div className="bg-theme-gray-200 rounded-2xl p-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left Section - Reward Table */}
          <div className="bg-white rounded-xl p-3">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[280px]">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-theme-dark-green border-b border-theme-gray">Min</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-theme-dark-green border-b border-theme-gray">Max</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-theme-dark-green border-b border-theme-gray">Reward%</th>
                  </tr>
                </thead>
                <tbody>
                  {rewardTableData.map((row) => (
                    <tr
                      key={row.min}
                      className="border-b border-theme-gray last:border-b-0"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900">{row.min}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{row.max}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{row.reward}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Section - Table Summary */}
          <div className="bg-white rounded-xl p-3">
            <h2 className="text-lg font-semibold text-theme-gray-700 ">Table Summary</h2>
            <div className="border border-theme-gray rounded-xl p-3">
              {summaryData.map((item, index) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2">
                      <Image
                        src={item.icon}
                        alt={item.label}
                        width={20}
                        height={20}
                        className="text-gray-400"
                      />
                      <span className="text-sm font-medium text-black/40">{item.label}</span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm text-black break-words font-semibold">{item.value}</span>
                    </div>
                  </div>
                  {index < summaryData.length - 1 && (
                    <hr className="border-theme-gray" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>


      </div>

      {/* Show countdown warning while counting down */}
      {countdown > 0 && (
        <RewardNotification
          text={`Reward System Will Be Paused When Allocated Amount Has Been Exhausted. (${countdown}s remaining)`}
          icon={warningIcon}
          type="info"
          delay={0}
          duration={0.6}
          className="my-5"
        />
      )}

      {/* Show pause notification when countdown reaches 0 */}
      {showNotifications && (
        <RewardNotification
          text="Your Reward Cap Has Been Reached. Rewards Are Paused Automatically. Edit The Cap To Resume."
          icon={redMusicPauseIcon}
          type="pause"
          delay={0}
          duration={0.6}
          className="my-5"
        />
      )}
    </main>
  );
}