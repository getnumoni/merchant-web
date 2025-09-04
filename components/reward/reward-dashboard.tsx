import { cashBackIcon, peopleIcon, pointIcon, successIconCheck } from "@/constant/icons";
import Image from "next/image";
import { GraphDirectionIcon } from "../common/icon-svg";
import PointAnalytics from "./point-analytics";

export default function RewardDashboard() {
  return (
    <main>
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white rounded-2xl p-4 ">
        {/* Budget Cap Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-green-800 to-green-900 text-white rounded-xl p-6 flex flex-col">
          {/* Cash Back Background Icon */}
          <div className="absolute -top-8 -right-16 opacity-30">
            <Image src={cashBackIcon} alt="Cash Back" width={200} height={200} />
          </div>

          <div className="relative z-10">
            <h3 className="text-white text-sm font-medium mb-4">Budget Cap</h3>
          </div>
          <div className="relative z-10 text-3xl font-bold mb-4 flex-1 flex items-center">20,000.00</div>
          <div className="relative z-10">
            <hr className="border-white/10 mb-4" />
            <div className="flex items-center gap-2">
              <div className="bg-white rounded-full px-2 py-1 flex items-center gap-1 ">
                <GraphDirectionIcon className="w-3 h-3 bg-theme-dark-green rounded-full p-0.5 text-white" />
                <span className="text-xs font-semibold text-theme-dark-green">+20%</span>
              </div>
              <span className="text-xs text-white font-semibold">Increase Than Last Month</span>
            </div>
          </div>
        </div>

        {/* Total Points Rewarded Card */}
        <div className="bg-theme-gray rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[#727272] text-md font-semibold">Total Points Rewarded</h3>
            <div className="bg-white rounded-full p-3">
              <Image src={pointIcon} alt="Reward" width={18} height={18} />
            </div>
          </div>
          <div className="text-3xl font-bold mb-4 flex-1">0.00</div>
          <hr className="border-gray-100 mb-4" />
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 rounded-full px-2 py-1 flex items-center gap-1">
              <GraphDirectionIcon className="w-3 h-3 bg-gray-500 rounded-full p-0.5 text-white" />
              <span className="text-xs font-medium text-gray-600">0%</span>
            </div>
            <span className="text-xs text-gray-500">No Data Yet</span>
          </div>
        </div>

        {/* Total Points Balance Card */}
        <div className="bg-theme-gray rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[#727272] text-md font-semibold">Total Points Balance</h3>
            <div className="bg-white rounded-full p-3">
              <Image src={pointIcon} alt="Reward" width={18} height={18} />
            </div>
          </div>
          <div className="text-3xl font-bold mb-4 flex-1">20,000.00</div>
          <hr className="border-gray-100 mb-2" />
          <div className="flex items-center gap-2">
            <div className="bg-[#F5F5F5] rounded-full p-2 flex items-center gap-1 w-full justify-center">
              <Image src={successIconCheck} alt="Success" width={18} height={18} />
              <span className="text-xs font-medium text-black/50">Cap value still on target</span>
            </div>
          </div>
        </div>

        {/* Customer Pool Card */}
        <div className="bg-theme-gray rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[#727272] text-md font-semibold">Customer Pool</h3>
            <div className="bg-white rounded-full p-3">
              <Image src={peopleIcon} alt="People" width={18} height={18} />
            </div>
          </div>
          <div className="text-3xl font-bold mb-4 flex-1">56</div>
          <hr className="border-gray-100 mb-4" />
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 rounded-full px-2 py-1 flex items-center gap-1">
              <GraphDirectionIcon className="w-3 h-3 bg-gray-500 rounded-full p-0.5 text-white" />
              <span className="text-xs font-medium text-gray-600">0%</span>
            </div>
            <span className="text-xs text-gray-500">No Data Yet</span>
          </div>
        </div>
      </section>

      <PointAnalytics />
    </main>
  )
}