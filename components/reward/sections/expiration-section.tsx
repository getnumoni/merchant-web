"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExpirationSectionProps } from "@/lib/types";


export default function ExpirationSection({ pointExpiration, setPointExpiration }: ExpirationSectionProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-900 mb-3">
        Point Expiration Before Next Purchase <span className="text-gray-500">(Optional)</span>
      </label>
      <Select value={pointExpiration} onValueChange={setPointExpiration}>
        <SelectTrigger className="w-full py-6 mt-2">
          <SelectValue placeholder="This Means Each Point Claimed By A User Will Expire If They Do Not Spend It" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1-day">1 Day</SelectItem>
          <SelectItem value="3-days">3 Days</SelectItem>
          <SelectItem value="7-days">7 Days</SelectItem>
          <SelectItem value="14-days">14 Days</SelectItem>
          <SelectItem value="30-days">30 Days</SelectItem>
          <SelectItem value="never">Never</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
