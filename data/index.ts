import { BranchIcon, DashboardIcon, DealIcon, RewardIcon } from "@/components/common/icon-svg";
import { dealIcon, graphDirectionIcon, musicPauseIcon, phoneNotificationIcon, pointIcon, successIconCheck } from "@/constant/icons";
import { BRANCH_LEVEL_URL, DASHBOARD_URL, DEALS_AND_PROMOS_URL, REWARD_TABLE_URL } from "@/constant/routes";

const navigationItems = [
  {
    name: 'Home',
    path: DASHBOARD_URL,
    icon: DashboardIcon
  },
  {
    name: 'Branch-Level',
    path: BRANCH_LEVEL_URL,
    icon: BranchIcon
  },
  {
    name: 'Reward Table',
    path: REWARD_TABLE_URL,
    icon: RewardIcon
  },
  {
    name: 'Deals & Promos',
    path: DEALS_AND_PROMOS_URL,
    icon: DealIcon
  }
]

// Data for "What You Can Do" section
const whatYouCanDoData = [
  {
    icon: dealIcon,
    alt: "Deal Icon",
    text: "Define rewards as a percentage, fixed amount, or by category"
  },
  {
    icon: graphDirectionIcon,
    alt: "Graph Direction Icon",
    text: "Set limits and caps to control total points issued"
  },
  {
    icon: musicPauseIcon,
    alt: "Pause Icon",
    text: "Pause and resume rewards when needed"
  },
  {
    icon: phoneNotificationIcon,
    alt: "Notification Icon",
    text: "Get notified when 75% of your reward budget is used"
  }
];

// Data for "Benefits" section
const benefitsData = [
  {
    icon: dealIcon,
    alt: "Control Icon",
    text: "Keep full control of your marketing spend"
  },
  {
    icon: graphDirectionIcon
    ,
    alt: "Motivation Icon",
    text: "Motivate customers to keep coming back"
  },
  {
    icon: musicPauseIcon,
    alt: "Fairness Icon",
    text: "Ensure rewards stay fair and sustainable"
  }
];

const tabs = [
  { id: "reward-table", label: "Reward Table" },
  { id: "customers-score", label: "Customers Score" },
  { id: "points-allocation", label: "Points Allocation" },
  { id: "analytics-trends", label: "Analytics & Trends" }
];

const rewardTableData = [
  { min: 1, max: "9,999", reward: "1%" },
  { min: "10,000", max: "29,999", reward: "2%" },
  { min: "30,000", max: "49,999", reward: "3%" },
  { min: "50,000", max: "69,999", reward: "4%" },
  { min: "70,000", max: "Above", reward: "5%" }
];

const summaryData = [
  {
    icon: dealIcon,
    label: "Reward Type",
    value: "Up to 5% cash-back"
  },
  {
    icon: pointIcon,
    label: "Claim Type",
    value: "Instant"
  },
  {
    icon: successIconCheck,
    label: "Issuing Date",
    value: "From today"
  },
  {
    icon: successIconCheck,
    label: "End Date",
    value: "-"
  }
];

// Dummy transaction data
const transactionData = [
  { id: 1, name: "From Adebimpe", date: "Aug 16, 2025", time: "2:45 PM", amount: "27,200", status: "Received" },
  { id: 2, name: "From Adebimpe", date: "Aug 16, 2025", time: "2:45 PM", amount: "27,200", status: "Received" },
  { id: 3, name: "To Olu", date: "Aug 19, 2025", time: "4:00 PM", amount: "8,750", status: "Received" },
  { id: 4, name: "To Uche", date: "Aug 21, 2025", time: "3:30 PM", amount: "20,600", status: "Received" },
  { id: 5, name: "From Chidi", date: "Aug 22, 2025", time: "10:15 AM", amount: "15,300", status: "Received" },
  { id: 6, name: "To Fatima", date: "Aug 22, 2025", time: "11:30 AM", amount: "12,500", status: "Received" },
  { id: 7, name: "From Ibrahim", date: "Aug 23, 2025", time: "1:20 PM", amount: "35,000", status: "Received" },
  { id: 8, name: "To Grace", date: "Aug 23, 2025", time: "3:45 PM", amount: "18,750", status: "Received" },
  { id: 9, name: "From David", date: "Aug 24, 2025", time: "9:00 AM", amount: "22,100", status: "Received" },
  { id: 10, name: "To Blessing", date: "Aug 24, 2025", time: "2:15 PM", amount: "14,800", status: "Received" },
  { id: 11, name: "From Sarah", date: "Aug 25, 2025", time: "4:30 PM", amount: "29,500", status: "Received" },
  { id: 12, name: "To Michael", date: "Aug 25, 2025", time: "5:45 PM", amount: "16,200", status: "Received" },
  { id: 13, name: "From Peace", date: "Aug 26, 2025", time: "8:30 AM", amount: "31,400", status: "Received" },
  { id: 14, name: "To John", date: "Aug 26, 2025", time: "12:00 PM", amount: "19,600", status: "Received" },
  { id: 15, name: "From Mary", date: "Aug 27, 2025", time: "1:45 PM", amount: "25,300", status: "Received" },
  { id: 16, name: "To Peter", date: "Aug 27, 2025", time: "3:20 PM", amount: "13,700", status: "Received" },
  { id: 17, name: "From James", date: "Aug 28, 2025", time: "10:45 AM", amount: "28,900", status: "Received" },
  { id: 18, name: "To Faith", date: "Aug 28, 2025", time: "2:30 PM", amount: "17,400", status: "Received" },
  { id: 19, name: "From Hope", date: "Aug 29, 2025", time: "11:15 AM", amount: "24,800", status: "Received" },
  { id: 20, name: "To Joy", date: "Aug 29, 2025", time: "4:00 PM", amount: "21,500", status: "Received" },
  { id: 21, name: "From Love", date: "Aug 30, 2025", time: "9:30 AM", amount: "26,700", status: "Received" },
  { id: 22, name: "To Patience", date: "Aug 30, 2025", time: "1:00 PM", amount: "15,900", status: "Received" },
  { id: 23, name: "From Wisdom", date: "Aug 31, 2025", time: "2:15 PM", amount: "33,200", status: "Received" },
  { id: 24, name: "To Understanding", date: "Aug 31, 2025", time: "5:30 PM", amount: "20,100", status: "Received" },
  { id: 25, name: "From Knowledge", date: "Sep 1, 2025", time: "8:45 AM", amount: "30,500", status: "Received" }
];

export { benefitsData, navigationItems, rewardTableData, summaryData, tabs, transactionData, whatYouCanDoData };

