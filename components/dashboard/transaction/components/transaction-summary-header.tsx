"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import ExportTransaction from "../export-transaction";
import SummaryDateRangeFilter, {
  SummaryDateRangeOption,
} from "./summary-date-range-filter";

interface TransactionSummaryHeaderProps {
  selectedRange: SummaryDateRangeOption;
  onRangeChange: (range: SummaryDateRangeOption) => void;
}

export default function TransactionSummaryHeader({
  selectedRange,
  onRangeChange,
}: Readonly<TransactionSummaryHeaderProps>) {
  const [openExportModal, setOpenExportModal] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-between my-4">
      <h2 className="text-lg font-semibold text-gray-900">
        Transaction Summary
      </h2>
      <div className="flex gap-2">
        <div>
          <Button
            className="bg-theme-dark-green"
            onClick={() => setOpenExportModal(true)}
          >
            Export
          </Button>
        </div>
        <SummaryDateRangeFilter
          selectedRange={selectedRange}
          onRangeChange={onRangeChange}
        />
      </div>
      <ExportTransaction
        isOpen={openExportModal}
        onClose={() => setOpenExportModal(false)}
      />
    </div>
  );
}
