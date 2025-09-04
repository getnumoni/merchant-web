import { Button } from "@/components/ui/button";
import { qrCode } from "@/constant/images";
import { QRCodeCardProps } from "@/lib/types";
import { Download, Share } from "lucide-react";
import Image from "next/image";


export default function QRCodeCard({
  qrCodeUrl = qrCode,
  title = "Brand's QR Code",
  description = "Print your store's QR code and display it for customers. They can scan to make quick transfers.",
  onDownload,
  onShare
}: QRCodeCardProps) {
  return (
    <section className="border border-gray-100 shadow-none rounded-xl sm:rounded-2xl p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
        <Image
          src={qrCodeUrl}
          alt="QR Code"
          width={180}
          height={180}
          className="rounded-lg flex-shrink-0 w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48"
        />
        <div className="text-center sm:text-left flex-1">
          <h3 className="text-sm sm:text-md lg:text-md font-semibold text-gray-900 mb-1 sm:mb-2">{title}</h3>
          <p className="text-xs sm:text-sm lg:text-md text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      <hr className="border-gray-50 my-3 sm:my-4" />
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <Button
          variant="outline"
          className="flex-1 flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50 rounded-full text-xs sm:text-sm py-2 sm:py-2.5 px-4"
          onClick={onDownload}
        >
          <Download className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden xs:inline">Download</span>
          <span className="xs:hidden">Download</span>
        </Button>
        <Button
          className="flex-1 flex items-center justify-center gap-2 bg-black hover:bg-gray-800 rounded-full text-xs sm:text-sm py-2 sm:py-2.5 px-4"
          onClick={onShare}
        >
          <Share className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden xs:inline">Share</span>
          <span className="xs:hidden">Share</span>
        </Button>
      </div>
    </section>
  );
}
