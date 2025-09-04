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
export { benefitsData, navigationItems, rewardTableData, summaryData, tabs, whatYouCanDoData };

