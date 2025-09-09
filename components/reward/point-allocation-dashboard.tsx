"use client";

import {
  branches,
  customerData,
  months,
  regions,
  timelineOptions,
  years
} from "@/data";
import { useState } from "react";
import CustomerSection from "./customer-section";
import DatePickerModal from "./date-picker-modal";
import FilterSection from "./filter-section";

export default function PointAllocationDashboard() {
  const [selectedBranch, setSelectedBranch] = useState("All Branch");
  const [selectedRegion, setSelectedRegion] = useState("All Region");
  const [selectedTimeline, setSelectedTimeline] = useState("Timeline");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const loyalCustomers = customerData.filter(customer => customer.loyaltyRank);
  const otherCustomers = customerData.filter(customer => !customer.loyaltyRank);

  const handleCustomRangeClick = () => {
    setShowDatePicker(true);
  };

  const handleDateSelect = (month: string, year: string) => {
    setSelectedTimeline(`${month} ${year}`);
  };

  return (
    <main className="px-2 sm:px-4 lg:px-0">
      <hr className="border-theme-gray my-4" />

      {/* Header Section */}
      <div className="flex flex-col gap-4 mb-4 sm:mb-6">
        {/* Title and Last Update */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <h1 className="text-sm sm:text-base font-semibold text-black/50 whitespace-nowrap">
              Points are currently held by customers
            </h1>
            {/* Filter Section */}
            <FilterSection
              branches={branches}
              regions={regions}
              timelineOptions={timelineOptions}
              selectedBranch={selectedBranch}
              selectedRegion={selectedRegion}
              selectedTimeline={selectedTimeline}
              onBranchChange={setSelectedBranch}
              onRegionChange={setSelectedRegion}
              onTimelineChange={setSelectedTimeline}
              onCustomRangeClick={handleCustomRangeClick}
            />
          </div>

          <p className="text-xs sm:text-sm text-black/50">
            (Last Update: 2 seconds ago)
          </p>
        </div>


      </div>

      {/* Customer Data Section */}
      <div className="space-y-4 sm:space-y-6 bg-theme-gray rounded-xl p-3 sm:p-4">
        <CustomerSection
          title="Your Most Loyal Customers"
          customers={loyalCustomers}
        />
        <CustomerSection
          title="Other Customers"
          customers={otherCustomers}
        />
      </div>

      {/* Date Picker Modal */}
      <DatePickerModal
        open={showDatePicker}
        onOpenChange={setShowDatePicker}
        onDateSelect={handleDateSelect}
        months={months}
        years={years}
      />
    </main>
  );
}