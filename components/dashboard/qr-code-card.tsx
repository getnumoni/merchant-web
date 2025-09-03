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
    <section className="border border-gray-100 shadow-none rounded-2xl p-4">
      <div className="flex items-start gap-3 ">
        <Image src={qrCodeUrl} alt="QR Code" width={180} height={180} className="rounded-lg flex-shrink-0" />
        <div>
          <h3 className="text-md font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">
            {description}
          </p>
        </div>
      </div>
      <hr className="border-gray-50 my-2" />
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50 rounded-full text-sm py-2"
          onClick={onDownload}
        >
          <Download className="w-3 h-3" />
          Download
        </Button>
        <Button
          className="flex-1 flex items-center justify-center gap-2 bg-black hover:bg-gray-800 rounded-full text-sm py-2"
          onClick={onShare}
        >
          <Share className="w-3 h-3" />
          Share
        </Button>
      </div>
    </section>
  );
}
