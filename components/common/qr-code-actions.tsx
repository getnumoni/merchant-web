import { Button } from "@/components/ui/button";
import { Download, Share } from "lucide-react";

interface QRCodeActionsProps {
  onDownload: () => void;
  onPrint: () => void;
  isDisabled?: boolean;
}

export default function QRCodeActions({
  onDownload,
  onPrint,
  isDisabled = false
}: QRCodeActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
      <Button
        variant="outline"
        className="flex-1 flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50 rounded-full text-xs sm:text-sm py-2 sm:py-2.5 px-4"
        onClick={onDownload}
        disabled={isDisabled}
      >
        <Download className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden xs:inline">Download</span>
        <span className="xs:hidden">Download</span>
      </Button>
      <Button
        className="flex-1 flex items-center justify-center gap-2 bg-black hover:bg-gray-800 rounded-full text-xs sm:text-sm py-2 sm:py-2.5 px-4"
        onClick={onPrint}
        disabled={isDisabled}
      >
        <Share className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden xs:inline">Print</span>
        <span className="xs:hidden">Print</span>
      </Button>
    </div>
  );
}
