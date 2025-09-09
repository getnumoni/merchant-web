"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { useState } from "react";

interface DatePickerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDateSelect: (month: string, year: string) => void;
  months: string[];
  years: string[];
  initialMonth?: string;
  initialYear?: string;
}

export default function DatePickerModal({
  open,
  onOpenChange,
  onDateSelect,
  months,
  years,
  initialMonth = "March",
  initialYear = "2025",
}: DatePickerModalProps) {
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [selectedYear, setSelectedYear] = useState(initialYear);

  const handleApply = () => {
    onDateSelect(selectedMonth, selectedYear);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-md mx-2 sm:mx-0">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-base sm:text-lg">Choose Date</DialogTitle>
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Select a timeline to filter your this data
          </p>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-6">
          {/* Months Column */}
          <div className="flex-1">
            <h4 className="font-medium text-xs sm:text-sm mb-2">Month</h4>
            <div className="space-y-1 max-h-32 sm:max-h-48 overflow-y-auto">
              {months.map((month) => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={`w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded text-xs sm:text-sm ${selectedMonth === month
                    ? "bg-green-500 text-white"
                    : "hover:bg-gray-100"
                    }`}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>

          {/* Years Column */}
          <div className="flex-1">
            <h4 className="font-medium text-xs sm:text-sm mb-2">Year</h4>
            <div className="space-y-1">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded text-xs sm:text-sm ${selectedYear === year
                    ? "bg-green-500 text-white"
                    : "hover:bg-gray-100"
                    }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Button
          className="w-full mt-4 sm:mt-6 bg-green-600 hover:bg-green-700 text-sm"
          onClick={handleApply}
        >
          Show Results
        </Button>
      </DialogContent>
    </Dialog>
  );
}
