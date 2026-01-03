'use client';

import SearchInput from "@/components/common/search-input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

type DateRangeOption = 'Today' | 'Yesterday' | 'This Week' | 'This Month' | 'Last Month' | null;

interface TransactionTableHeaderProps {
  title: string;
  dateRange: DateRangeOption;
  searchQuery: string;
  onDateRangeChange: (range: DateRangeOption) => void;
  onSearchChange: (query: string) => void;
}

export default function TransactionTableHeader({
  title,
  dateRange,
  searchQuery,
  onDateRangeChange,
  onSearchChange,
}: TransactionTableHeaderProps) {
  const [open, setOpen] = useState(false);

  const handleDateRangeChange = (range: DateRangeOption) => {
    onDateRangeChange(range);
    setOpen(false);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      <div className="flex items-center gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <span>{dateRange || 'Select Date Range'}</span>
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-1">
            <div
              className={`px-3 py-2 text-sm cursor-pointer rounded-md transition-colors ${dateRange === null
                ? 'bg-gray-100 font-medium'
                : 'hover:bg-gray-100'
                }`}
              onClick={() => handleDateRangeChange(null)}
            >
              All Time
            </div>
            <div
              className={`px-3 py-2 text-sm cursor-pointer rounded-md transition-colors ${dateRange === 'Today'
                ? 'bg-gray-100 font-medium'
                : 'hover:bg-gray-100'
                }`}
              onClick={() => handleDateRangeChange('Today')}
            >
              Today
            </div>
            <div
              className={`px-3 py-2 text-sm cursor-pointer rounded-md transition-colors ${dateRange === 'Yesterday'
                ? 'bg-gray-100 font-medium'
                : 'hover:bg-gray-100'
                }`}
              onClick={() => handleDateRangeChange('Yesterday')}
            >
              Yesterday
            </div>
            <div
              className={`px-3 py-2 text-sm cursor-pointer rounded-md transition-colors ${dateRange === 'This Week'
                ? 'bg-gray-100 font-medium'
                : 'hover:bg-gray-100'
                }`}
              onClick={() => handleDateRangeChange('This Week')}
            >
              This Week
            </div>
            <div
              className={`px-3 py-2 text-sm cursor-pointer rounded-md transition-colors ${dateRange === 'This Month'
                ? 'bg-gray-100 font-medium'
                : 'hover:bg-gray-100'
                }`}
              onClick={() => handleDateRangeChange('This Month')}
            >
              This Month
            </div>
            <div
              className={`px-3 py-2 text-sm cursor-pointer rounded-md transition-colors ${dateRange === 'Last Month'
                ? 'bg-gray-100 font-medium'
                : 'hover:bg-gray-100'
                }`}
              onClick={() => handleDateRangeChange('Last Month')}
            >
              Last Month
            </div>
          </PopoverContent>
        </Popover>
        <SearchInput
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={onSearchChange}
          maxWidth="max-w-xs"
        />
      </div>
    </div>
  );
}

export type { DateRangeOption };

