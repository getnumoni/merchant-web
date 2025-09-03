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

export { navigationItems };