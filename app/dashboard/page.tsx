import Dashboard from "@/components/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {

  title: 'Dashboard',
  description: 'Dashboard',
}
export default function Page() {
  return (
    <div className="max-w-7xl mx-auto">
      <Dashboard />
    </div>
  );
}