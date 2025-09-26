"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, XIcon } from "lucide-react";
import { useState } from "react";

interface CustomDateRangeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDateSelect: (startDate: string, endDate: string) => void;
  initialStartDate?: string;
  initialEndDate?: string;
}

export default function CustomDateRangeModal({
  open,
  onOpenChange,
  onDateSelect,
  initialStartDate = "",
  initialEndDate = "",
}: CustomDateRangeModalProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(
    initialStartDate ? new Date(initialStartDate) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    initialEndDate ? new Date(initialEndDate) : undefined
  );
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  const handleApply = () => {
    if (startDate && endDate) {
      const startDateString = startDate.toISOString().split('T')[0];
      const endDateString = endDate.toISOString().split('T')[0];
      onDateSelect(startDateString, endDateString);
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setStartDate(initialStartDate ? new Date(initialStartDate) : undefined);
    setEndDate(initialEndDate ? new Date(initialEndDate) : undefined);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-md mx-2 sm:mx-0">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-base sm:text-lg">Custom Date Range</DialogTitle>
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Select a custom date range to filter your data
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-4 sm:mt-6">
          {/* Start Date Picker */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Start Date
            </label>
            <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Pick start date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => {
                    setStartDate(date);
                    setStartDateOpen(false);
                  }}
                  disabled={(date) =>
                    date > new Date() ||
                    date < new Date("1900-01-01") ||
                    (endDate ? date > endDate : false)
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* End Date Picker */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              End Date
            </label>
            <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : "Pick end date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={(date) => {
                    setEndDate(date);
                    setEndDateOpen(false);
                  }}
                  disabled={(date) =>
                    date > new Date() ||
                    date < new Date("1900-01-01") ||
                    (startDate ? date < startDate : false)
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Selected Dates Display */}
          {startDate && endDate && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Selected Range:</span>{" "}
                {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
              </p>
            </div>
          )}

          {/* Validation Message */}
          {startDate && endDate && startDate > endDate && (
            <p className="text-sm text-red-500">
              End date must be after start date
            </p>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            disabled={!startDate || !endDate || (startDate && endDate && startDate > endDate)}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            Apply Range
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
