import { ComponentType, ReactNode } from "react";


type TanstackProviderProps = {
  children: ReactNode
}

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


type RewardRulesSectionProps = {
  earnMethod: string;
  minSpending: string;
  setMinSpending: (value: string) => void;
  maxSpending: string;
  setMaxSpending: (value: string) => void;
  rewardPercentage: string;
  setRewardPercentage: (value: string) => void;
  rewardRules: Array<{ min: string, max: string, percentage: string }>;
  setRewardRules: (rules: Array<{ min: string, max: string, percentage: string }>) => void;
  showTable: boolean;
  setShowTable: (show: boolean) => void;
}

type RewardCapSectionProps = {
  rewardCap: string;
  setRewardCap: (value: string) => void;
}

type ReceiveMethodSectionProps = {
  receiveMethod: string;
  setReceiveMethod: (value: string) => void;
}

type ExpirationSectionProps = {
  pointExpiration: string;
  setPointExpiration: (value: string) => void;
}

type DateSectionProps = {
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
}

type signInPayload = {
  username: string;
  password: string;
  usertype: string;
  deviceId: string;
}

type AuthUser = {
  id: string;
  username: string;
  usertype: string;
  roles: string[];
  token: string;
  refreshToken: string;
}

type AuthUserStore = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logoutInProgress: boolean;

  // Actions
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
  updateTokens: (token: string, refreshToken: string) => void;
  setLoading: (loading: boolean) => void;
  setLogoutInProgress: (inProgress: boolean) => void;
}

type CreateRewardsPayload = {
  merchantId: string;
  rewardType: string;
  rules: Array<{
    minSpend: number;
    maxSpend: number;
    rewardValue: number;
  }>;
  rewardCap: number;
  distributionType: string;
  milestoneTarget: number;
  pointExpirationDays: number;
  status: string;
}


type AdminNavigationItem = {
  name: string;
  path?: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  children?: AdminNavigationItem[];
  badge?: string;
}

export type { ActiveBranchModalProps, AdminNavigationItem, AuthUser, AuthUserStore, BranchSummaryData, BrandProfileProps, BrandSummaryProps, CreateRewardsPayload, Customer, CustomerCardProps, CustomerSectionProps, DashboardProps, DateSectionProps, ExpirationSectionProps, MainBranchSummaryProps, QRCodeCardProps, ReceiveMethodSectionProps, RewardCapSectionProps, RewardModalProps, RewardRulesSectionProps, SidebarProps, signInPayload, TanstackProviderProps };

