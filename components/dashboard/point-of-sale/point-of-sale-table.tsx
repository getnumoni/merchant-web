import { DataTable } from "@/components/ui/data-table";
import { PointOfSaleData } from "@/lib/types";
import { pointOfSaleColumns } from "./point-of-sale-column";

interface PointOfSaleTableProps {
  title?: string;
  onSearchChange?: (value: string) => void;
  searchValue: string;
  searchPlaceholder?: string;
  data: PointOfSaleData[];
}

export default function PointOfSaleTable({ title = "Point of Sale History", onSearchChange, searchValue, searchPlaceholder = "Search point of sale...", data }: PointOfSaleTableProps) {
  return <div className="bg-white rounded-2xl p-4 my-4">
    <div className="flex items-center justify-between mb-4">
      {/* <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      {onSearchChange && (
        <SearchInput
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={onSearchChange}
          maxWidth="max-w-xs"
        />
      )} */}

      <div className="overflow-x-auto">
        <DataTable columns={pointOfSaleColumns} data={data} />
      </div>
    </div>
  </div>;
}