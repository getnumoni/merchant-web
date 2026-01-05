'use client';

import LoadingErrorState from "@/components/common/loading-error-state";
import { Button } from "@/components/ui/button";
import { DateRangeOption, DateRangeSelector } from "@/components/ui/date-range-selector";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FormInputTopLabel } from "@/components/ui/form-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useExportPosTransaction } from "@/hooks/query/useExportPosTransaction";
import useGetAllPos from "@/hooks/query/useGetAllPos";
import useGetMerchant from "@/hooks/query/useGetMerchant";
import { getTimelineDates } from "@/lib/helper";
import { PointOfSaleData } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface ExportPOSProps {
  isOpen: boolean;
  onClose: () => void;
}

const exportSchema = z.object({
  posId: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  transactionType: z.string().optional(),
  customerEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
  customerPhoneNo: z.string().optional(),
  customerId: z.string().optional(),
}).superRefine((data, ctx) => {
  if (!data.startDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Start date is required",
      path: ["startDate"],
    });
  }
  if (!data.endDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "End date is required",
      path: ["endDate"],
    });
  }
  if (data.startDate && data.endDate && data.endDate < data.startDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "End date must be after start date",
      path: ["endDate"],
    });
  }
});

type ExportFormData = z.infer<typeof exportSchema>;

export default function ExportPOS({ isOpen, onClose }: ExportPOSProps) {
  const { isPending: isLoadingMerchant, data: merchantData } = useGetMerchant();
  const { isPending: isLoadingPos, data: posData } = useGetAllPos();
  const { handleExportPosTransaction, isPending: isExporting, isSuccess } = useExportPosTransaction();

  const [dateRangeOption, setDateRangeOption] = useState<DateRangeOption>(null);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  // Extract merchant information
  const merchant = useMemo(() => {
    const merchantInfo = merchantData?.data?.data;
    if (!merchantInfo) return null;

    return {
      merchantId: merchantInfo.merchantId || merchantInfo.userId,
      merchantName: merchantInfo.businessName || merchantInfo.brandName,
    };
  }, [merchantData]);

  // Extract POS list
  const posList = useMemo(() => {
    const allPos = posData?.data?.data as PointOfSaleData[] | undefined;
    return allPos || [];
  }, [posData]);

  const form = useForm<ExportFormData>({
    resolver: zodResolver(exportSchema),
    defaultValues: {
      posId: "",
      transactionType: "",
      customerEmail: "",
      customerPhoneNo: "",
      customerId: "",
    },
  });

  // Helper function to parse YYYY-MM-DD string to local Date
  const parseDateString = useCallback((dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }, []);

  // Helper function to convert date range option to actual dates
  const getDatesFromRangeOption = useCallback((option: DateRangeOption): { start: Date; end: Date } | null => {
    if (!option || option === 'Custom Range') return null;

    const dateStrings = getTimelineDates(option);
    const start = parseDateString(dateStrings.startDate);
    const end = parseDateString(dateStrings.endDate);

    return { start, end };
  }, [parseDateString]);

  // Handle date range option changes
  const handleDateRangeOptionChange = useCallback((option: DateRangeOption) => {
    setDateRangeOption(option);

    if (option && option !== 'Custom Range') {
      const dates = getDatesFromRangeOption(option);
      if (dates) {
        setStartDate(dates.start);
        setEndDate(dates.end);
        form.setValue("startDate", dates.start, { shouldValidate: true });
        form.setValue("endDate", dates.end, { shouldValidate: true });
      }
    } else if (option === 'Custom Range') {
      // Reset dates when switching to custom range
      setStartDate(undefined);
      setEndDate(undefined);
      form.setValue("startDate", undefined, { shouldValidate: true });
      form.setValue("endDate", undefined, { shouldValidate: true });
    } else {
      // Reset when option is null
      setStartDate(undefined);
      setEndDate(undefined);
      form.setValue("startDate", undefined, { shouldValidate: true });
      form.setValue("endDate", undefined, { shouldValidate: true });
    }
  }, [getDatesFromRangeOption, form]);

  // Handle custom date changes from DateRangeSelector
  const handleCustomDatesChange = useCallback((customStart: Date | undefined, customEnd: Date | undefined) => {
    if (dateRangeOption === 'Custom Range') {
      setStartDate(customStart);
      setEndDate(customEnd);
      if (customStart) {
        form.setValue("startDate", customStart, { shouldValidate: true });
      }
      if (customEnd) {
        form.setValue("endDate", customEnd, { shouldValidate: true });
      }
    }
  }, [dateRangeOption, form]);

  const handleClose = useCallback(() => {
    form.reset();
    setStartDate(undefined);
    setEndDate(undefined);
    setDateRangeOption(null);
    onClose();
  }, [form, onClose]);

  const handleSubmit = async (formData: ExportFormData) => {
    if (!merchant) return;

    if (!formData.startDate || !formData.endDate) {
      form.setError("startDate", { message: "Date range is required" });
      return;
    }

    // Format dates as DD-MM-YYYY
    const startDateStr = format(formData.startDate, "dd-MM-yyyy");
    const endDateStr = format(formData.endDate, "dd-MM-yyyy");

    handleExportPosTransaction({
      merchantId: merchant.merchantId,
      posId: formData.posId || undefined,
      startDate: startDateStr,
      endDate: endDateStr,
      transactionType: formData.transactionType || undefined,
      customerEmail: formData.customerEmail || undefined,
      customerPhoneNo: formData.customerPhoneNo || undefined,
      customerId: formData.customerId || undefined,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess, handleClose]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle>Export POS Transactions</DialogTitle>
        </DialogHeader>

        <LoadingErrorState
          isLoading={isLoadingMerchant || isLoadingPos}
          hasError={!merchant}
          loadingMessage="Loading data..."
          errorMessage="Unable to load merchant information"
        >
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  {/* Query Parameters Display */}
                  {/* <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Query Parameters</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">merchantId:</span>
                        <span className="ml-2 font-mono text-gray-900">{merchant?.merchantId || "N/A"}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">posId:</span>
                        <span className="ml-2 font-mono text-gray-900">
                          {form.watch("posId") || "Not selected (optional)"}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">startDate:</span>
                        <span className="ml-2 font-mono text-gray-900">
                          {startDate ? format(startDate, "dd-MM-yyyy") : "Select start date"}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">endDate:</span>
                        <span className="ml-2 font-mono text-gray-900">
                          {endDate ? format(endDate, "dd-MM-yyyy") : "Select end date"}
                        </span>
                      </div>
                    </div>
                  </div> */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Date Range Picker - Required */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#838383]">
                        Date Range <span className="text-red-500">*</span>
                      </label>
                      <DateRangeSelector
                        value={dateRangeOption}
                        onValueChange={handleDateRangeOptionChange}
                        onDatesChange={handleCustomDatesChange}
                        showCustomRange={true}
                        placeholder="Select Date Range"
                      />
                      {form.formState.errors.startDate && (
                        <p className="text-sm font-medium text-destructive">
                          {form.formState.errors.startDate.message}
                        </p>
                      )}
                      {form.formState.errors.endDate && (
                        <p className="text-sm font-medium text-destructive">
                          {form.formState.errors.endDate.message}
                        </p>
                      )}
                    </div>
                    {/* POS Selection */}
                    <FormField
                      control={form.control}
                      name="posId"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <label className="text-sm font-medium text-[#838383]">
                            POS
                          </label>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full p-5 shadow-none">
                                <SelectValue placeholder="Select a POS" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {posList.map((pos) => (
                                <SelectItem key={pos.posId} value={pos.posId}>
                                  {pos.posName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>



                  {/* Optional Parameters */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInputTopLabel
                      control={form.control}
                      name="transactionType"
                      label="Transaction Type"
                      placeholder="e.g. CREDIT, DEBIT"
                    />

                    <FormInputTopLabel
                      control={form.control}
                      name="customerEmail"
                      label="Customer Email"
                      type="email"
                      placeholder="customer@example.com"
                    />

                    <FormInputTopLabel
                      control={form.control}
                      name="customerPhoneNo"
                      label="Customer Phone Number"
                      placeholder="e.g. +2348012345678"
                    />

                    <FormInputTopLabel
                      control={form.control}
                      name="customerId"
                      label="Customer ID"
                      placeholder="Enter customer ID"
                    />
                  </div>
                </form>
              </Form>
            </div>

            <div className="px-6 py-4 border-t flex justify-end gap-4">
              <Button variant="outline" onClick={handleClose} disabled={isExporting}>
                Cancel
              </Button>

              <Button
                onClick={form.handleSubmit(handleSubmit)}
                disabled={isExporting || !startDate || !endDate}
                className="bg-theme-dark-green text-white disabled:opacity-50 disabled:cursor-not-allowed"
                isLoading={isExporting}
                loadingText="Exporting..."
              >
                Export
              </Button>
            </div>
          </>
        </LoadingErrorState>
      </DialogContent>
    </Dialog>
  );
}
