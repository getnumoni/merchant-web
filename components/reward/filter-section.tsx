"use client";

import FilterDropdown from "./filter-dropdown";

interface FilterSectionProps {
  branches: string[];
  regions: string[];
  timelineOptions: string[];
  selectedBranch: string;
  selectedRegion: string;
  selectedTimeline: string;
  onBranchChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onTimelineChange: (value: string) => void;
  onCustomRangeClick: () => void;
}

export default function FilterSection({
  branches,
  regions,
  timelineOptions,
  selectedBranch,
  selectedRegion,
  selectedTimeline,
  onBranchChange,
  onRegionChange,
  onTimelineChange,
  onCustomRangeClick,
}: FilterSectionProps) {
  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 lg:gap-4">
      {/* All Branch Dropdown */}
      <FilterDropdown
        options={["All Branch", ...branches]}
        value={selectedBranch}
        onValueChange={onBranchChange}
        buttonClassName="w-full sm:w-[120px] justify-between px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        contentClassName="w-[200px] sm:w-[250px]"
      />

      {/* All Region Dropdown with Search */}
      <FilterDropdown
        options={["All Region", ...regions]}
        value={selectedRegion}
        onValueChange={onRegionChange}
        searchPlaceholder="E.G Abuja"
        enableSearch={true}
        buttonClassName="w-full sm:w-[120px] justify-between px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        contentClassName="w-[200px]"
      />

      {/* All LGA Dropdown */}
      <FilterDropdown
        options={["All LGA", "Ikeja", "Victoria Island", "Abuja Central"]}
        value="All LGA"
        onValueChange={() => { }}
        buttonClassName="w-full sm:w-[120px] justify-between px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        contentClassName="w-[160px] sm:w-[180px]"
      />

      {/* Timeline Dropdown */}
      <FilterDropdown
        options={timelineOptions}
        value={selectedTimeline}
        onValueChange={onTimelineChange}
        buttonClassName="w-full sm:w-[120px] justify-between px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        contentClassName="w-[200px]"
        showCustomRange={true}
        onCustomRangeClick={onCustomRangeClick}
      />
    </div>
  );
}
