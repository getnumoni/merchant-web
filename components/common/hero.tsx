'use client';

import { DashboardProps } from "@/lib/types";
import { usePathname } from "next/navigation";
import BrandProfile from "../dashboard/brand-profile";
import BrandSummary from "../dashboard/brand-summary";
import MainBranchSummary from "../dashboard/main-branch-summary";
import QRCodeCard from "../dashboard/qr-code-card";


export default function Hero({
  brandName = "Chicken Republic",
  merchantId = "#nu225577",
  logoUrl,
  qrCodeUrl,
  qrTitle = "Brand's QR Code",
  qrDescription = "Print your store's QR code and display it for customers. They can scan to make quick transfers.",
  summaryContent,
  onAccountSettings,
  onDownload,
  onShare
}: DashboardProps) {
  const pathname = usePathname();

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
        brandName={brandName}
        merchantId={merchantId}
        logoUrl={logoUrl}
        onAccountSettings={onAccountSettings}
      />

      <QRCodeCard
        qrCodeUrl={qrCodeUrl}
        title={qrTitle}
        description={qrDescription}
        onDownload={onDownload}
        onShare={onShare}
      />

      {getSummaryComponent()}
    </div>
  );
}