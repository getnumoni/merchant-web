import { ReactNode } from "react";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
}

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

type BranchSummaryData = {
  id: string;
  merchantName: string;
  merchantId: string;
  merchantLogo: string;
  status: 'active' | 'closed' | 'pending';
  todayTransactions: {
    allocatedBudget: number;
    amountSpent: number;
    fees: number;
  };
}


type ActiveBranchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

type RewardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
  icon?: ReactNode;
  iconColor?: 'red' | 'green' | 'blue' | 'yellow' | 'gray';
  title: string;
  description: string;
  subDescription?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  secondaryButtonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  primaryButtonColor?: string;
  secondaryButtonColor?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

type Customer = {
  id: number;
  name: string;
  spent: string;
  earned: string;
  branch: string;
  loyaltyRank: number | null;
  merchantIcon: string;
  profileIcon: string;
}

type CustomerCardProps = {
  customer: Customer;
}

type CustomerSectionProps = {
  title: string;
  customers: Customer[];
}


export type { ActiveBranchModalProps, BranchSummaryData, BrandProfileProps, BrandSummaryProps, Customer, CustomerCardProps, CustomerSectionProps, DashboardProps, MainBranchSummaryProps, QRCodeCardProps, RewardModalProps, SidebarProps };

