import Reward from "@/components/reward";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reward Table",
  description: "Redeem your reward points at participating merchants across different categories, nationwide",
};

export default function Page() {
  return <Reward />;
}