import Deals from "@/components/deals";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Deals',
  description: 'Deals',
}
export default function Page() {
  return <Deals />;
}