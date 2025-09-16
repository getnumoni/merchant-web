import { RewardIcon } from "@/components/common/icon-svg";
import { Input } from "@/components/ui/input";
import { MilestoneTargetSectionProps } from "@/lib/types";

export default function MilestoneTargetSection({ milestoneTarget, setMilestoneTarget }: MilestoneTargetSectionProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="milestoneTarget" className="text-sm font-medium text-gray-900">Milestone Target  <span className="text-xs text-gray-600">(How Many Points Should They Meet Before Claiming.)</span> <span className="text-red-500">*</span></label>


      <div className="relative">
        <Input
          type="number"
          placeholder="0"
          value={milestoneTarget}
          onChange={(e) => setMilestoneTarget(e.target.value)}
          className="w-full pl-10 pr-3 py-6 focus:outline-none focus:ring-0 focus:border-none"
        />
        <RewardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-dark-green pointer-events-none h-4 w-4" />
      </div>
    </div>
  );
}