import CustomerCard from "./customer-card";

interface Customer {
  id: number;
  name: string;
  spent: string;
  earned: string;
  branch: string;
  loyaltyRank: number | null;
  profileIcon: string;
}

interface CustomerSectionProps {
  title: string;
  customers: Customer[];
}

export default function CustomerSection({ title, customers }: CustomerSectionProps) {
  return (
    <div>
      <h2 className="text-base sm:text-lg font-semibold text-black/50 mb-3 sm:mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {customers.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div>
    </div>
  );
}
