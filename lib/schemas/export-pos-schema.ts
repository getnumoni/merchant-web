import { z } from 'zod';

export const exportPosTransactionSchema = z.object({
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

export type ExportPosTransactionFormData = z.infer<typeof exportPosTransactionSchema>;

