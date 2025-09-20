'use client';

import useGetMerchant from "@/hooks/query/useGetMerchant";
import { DashboardProps } from "@/lib/types";
import { usePathname } from "next/navigation";
import BrandProfile from "../dashboard/brand-profile";
import BrandSummary from "../dashboard/brand-summary";
import MainBranchSummary from "../dashboard/main-branch-summary";
import QRCodeCard from "../dashboard/qr-code-card";


export default function Hero({
  qrTitle = "Brand's QR Code",
  qrDescription = "Print your store's QR code and display it for customers. They can scan to make quick transfers.",
  summaryContent,
  onAccountSettings,
  onDownload,
  onShare
}: DashboardProps) {
  const pathname = usePathname();

  const { data: merchant, isPending } = useGetMerchant();
  const merchantInfo = merchant?.data?.data;

  // Determine which summary component to show based on route
  const getSummaryComponent = () => {
    if (pathname.includes("branch-level")) {
      return <MainBranchSummary />;
    }
    return summaryContent || <BrandSummary />;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-white rounded-2xl p-4">
      <BrandProfile
        brandName={merchantInfo?.businessName}
        merchantId={merchantInfo?.merchantId}
        logoUrl={merchantInfo?.businessImagePath}
        onAccountSettings={onAccountSettings}
        isLoading={isPending}
      />

      <QRCodeCard
        qrCodeUrl={merchantInfo?.qrCode}
        title={qrTitle}
        description={qrDescription}
        onDownload={onDownload}
        onShare={onShare}
        isLoading={isPending}
      />

      {getSummaryComponent()}
    </div>
  );
}