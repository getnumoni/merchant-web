import { dealIcon, graphDirectionIcon, musicPauseIcon, phoneNotificationIcon } from "@/constant/icons";
import { BRANCH_LEVEL_URL, DASHBOARD_URL, DEALS_AND_PROMOS_URL, REWARD_TABLE_URL } from "@/constant/routes";
import { LayoutGrid } from "lucide-react";

const navigationItems = [
  {
    name: 'Home',
    path: DASHBOARD_URL,
    icon: LayoutGrid
  },
  {
    name: 'Branch-Level',
    path: BRANCH_LEVEL_URL
  },
  {
    name: 'Reward Table',
    path: REWARD_TABLE_URL
  },
  {
    name: 'Deals & Promos',
    path: DEALS_AND_PROMOS_URL
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
export { benefitsData, navigationItems, whatYouCanDoData };
