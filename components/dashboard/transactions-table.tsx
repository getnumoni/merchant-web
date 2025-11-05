'use client';

import TransactionPagination from "@/components/branch-level/transaction-pagination";
import SearchInput from "@/components/common/search-input";
import { DataTable } from "@/components/ui/data-table";
import { formatDateTime } from "@/lib/helper";
import { ColumnDef } from "@tanstack/react-table";

export interface TransactionData {
  branchId: string | null;
  previousDealPrice: number | null;
  transactionReference: string;
  dealId: string | null;
  branchName: string;
  type: string;
  merchantName: string;
  points: number;
  transactionType: string;
  createdAt: string;
  merchantId: string;
  customerId: string;
  id: string;
  currentDealPrice: number | null;
  dealName?: string;
}

const columns: ColumnDef<TransactionData>[] = [
  {
    accessorKey: "transactionReference",
    header: "Transaction Reference",
    cell: ({ row }) => {
      const ref = row.getValue("transactionReference") as string;
      const truncatedRef = ref ? `${ref.substring(0, 8)}...` : "";
      return <div className="font-mono text-sm" title={ref}>{truncatedRef}</div>;
    },
  },
  {
    accessorKey: "branchName",
    header: "Branch",
  },
  {
    accessorKey: "dealName",
    header: "Deal",
    cell: ({ row }) => {
      const dealName = row.getValue("dealName") as string | undefined;
      return <div>{dealName || "—"}</div>;
    },
  },
  {
    accessorKey: "points",
    header: "Points",
    cell: ({ row }) => {
      const points = row.getValue("points") as number;
      return <div className="font-semibold">{points}</div>;
    },
  },
  {
    accessorKey: "transactionType",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("transactionType") as string;
      return (
        <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${type === "DEBIT" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}>
          {type}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      return <div className="text-sm">{formatDateTime(date)}</div>;
    },
  },
];

export interface PaginationInfo {
  isFirst: boolean;
  isLast: boolean;
  currentPageElements: number;
  totalPages: number;
  pageSize: number;
  hasPrevious: boolean;
  hasNext: boolean;
  currentPage: number;
  totalElements: number;
}

interface TransactionsTableProps {
  data: TransactionData[];
  title?: string;
  pagination?: PaginationInfo;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  onDownload?: () => void;
  onInfo?: () => void;
  onDelete?: () => void;
}

export default function TransactionsTable({
  data,
  title = "Transactions",
  pagination,
  currentPage = 0,
  onPageChange,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search transactions...",
  onDownload,
  onInfo,
  onDelete
}: TransactionsTableProps) {
  return (
    <div className="bg-white rounded-2xl p-4 my-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        {onSearchChange && (
          <SearchInput
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={onSearchChange}
            maxWidth="max-w-xs"
          />
        )}
      </div>
      <div className="overflow-x-auto">
        <DataTable columns={columns} data={data} />
      </div>
      {pagination && onPageChange && data.length > 0 && (
        <TransactionPagination
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          totalRows={pagination.totalElements}
          currentPageDataLength={pagination.currentPageElements}
          pageSize={pagination.pageSize}
          onPageChange={onPageChange}
          onDownload={onDownload}
          onInfo={onInfo}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}
