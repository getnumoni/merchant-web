"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateSectionProps } from "@/lib/types";


export default function DateSection({ startDate, setStartDate, endDate, setEndDate }: DateSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Start Issuing Reward From */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-900">
          Start Issuing Reward From <span className="text-red-500">*</span>
        </label>
        <Select value={startDate} onValueChange={setStartDate}>
          <SelectTrigger className="w-full py-6 mt-2">
            <SelectValue placeholder="August 19 (Today)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">August 19 (Today)</SelectItem>
            <SelectItem value="tomorrow">August 20 (Tomorrow)</SelectItem>
            <SelectItem value="next-week">Next Week</SelectItem>
            <SelectItem value="next-month">Next Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Close Reward On */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-900">Close Reward On</label>
        <Select value={endDate} onValueChange={setEndDate}>
          <SelectTrigger className="w-full py-6 mt-2">
            <SelectValue placeholder="Choose" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="never">Never</SelectItem>
            <SelectItem value="1-month">1 Month</SelectItem>
            <SelectItem value="3-months">3 Months</SelectItem>
            <SelectItem value="6-months">6 Months</SelectItem>
            <SelectItem value="1-year">1 Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
