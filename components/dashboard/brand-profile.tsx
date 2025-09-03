import { Button } from "@/components/ui/button";
import { blueVerifiedIcon, rightArrowIcon } from "@/constant/icons";
import { sampleUserIcon } from "@/constant/images";
import { BrandProfileProps } from "@/lib/types";
import Image from "next/image";



export default function BrandProfile({
  brandName = "Chicken Republic",
  merchantId = "#nu225577",
  logoUrl = sampleUserIcon,
  onAccountSettings
}: BrandProfileProps) {
  return (
    <section className="shadow-none border-none rounded-2xl p-4 bg-[#FAFAFA]">
      <div className="flex flex-col items-center text-center">
        <div className="bg-white rounded-2xl p-3 mb-3">
          <Image src={logoUrl} alt={brandName} width={60} height={60} className="rounded-full" />
        </div>
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-lg font-bold text-gray-900">{brandName}</h2>
          <Image src={blueVerifiedIcon} alt="verified-badge" width={16} height={16} />
        </div>
        <p className="text-xs text-gray-600 mb-4">
          Merchant ID: <span className="text-green-600 font-medium">{merchantId}</span>
        </p>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50 text-sm py-2"
          onClick={onAccountSettings}
        >
          Account Settings
          <Image src={rightArrowIcon} alt="arrow-right" width={16} height={16} />
        </Button>
      </div>
    </section>
  );
}
