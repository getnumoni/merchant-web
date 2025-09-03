import { ReactNode } from "react";

type DashboardProps = {
  brandName?: string;
  merchantId?: string;
  logoUrl?: string;
  qrCodeUrl?: string;
  qrTitle?: string;
  qrDescription?: string;
  summaryContent?: ReactNode;
  onAccountSettings?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
}

type BrandSummaryProps = {
  title?: string;
  subtitle?: string;
  onboardedBranches?: number;
  availableBrandPoints?: string;
  totalCustomers?: string;
}

type QRCodeCardProps = {
  qrCodeUrl?: string;
  title?: string;
  description?: string;
  onDownload?: () => void;
  onShare?: () => void;
}

type BrandProfileProps = {
  brandName?: string;
  merchantId?: string;
  logoUrl?: string;
  onAccountSettings?: () => void;
}

type SummaryItem = {
  label: string;
  value: string;
  color: 'green' | 'red' | 'gray';
}

type MainBranchSummaryProps = {
  title?: string;
  items?: SummaryItem[];
}

export type { BrandProfileProps, BrandSummaryProps, DashboardProps, MainBranchSummaryProps, QRCodeCardProps };

