"use client";

import { useUpdateBranchManager } from "@/hooks/mutation/useUpdateBranchManager";
import { formatPhoneWithPlus234 } from "@/lib/phone-utils";
import { step3Schema } from "@/lib/schemas/branch-schema";
import { singleBranchDetails } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

type ManagerFormData = z.infer<typeof step3Schema>;

interface EditBranchManagerProps {
  singleBranch: singleBranchDetails;
}

export default function EditBranchManager({ singleBranch }: EditBranchManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { handleUpdateBranchManager: updateManager, isPending, isSuccess } = useUpdateBranchManager();

  const form = useForm<ManagerFormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      managerName: singleBranch.managerDetails?.name || "",
      managerEmail: singleBranch.managerDetails?.email || "",
      managerPhone: singleBranch.managerDetails?.phone || "",
    },
  });

  const onSubmit = (data: ManagerFormData) => {
    const formatManagerPhone = formatPhoneWithPlus234(data.managerPhone);
    const payload = {
      branchId: singleBranch.id,
      name: data.managerName,
      email: data.managerEmail,
      phone: formatManagerPhone,
    };

    updateManager(payload);
  };

  // Close modal when update is successful
  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset form when closing
      form.reset({
        managerName: singleBranch.managerDetails?.name || "",
        managerEmail: singleBranch.managerDetails?.email || "",
        managerPhone: singleBranch.managerDetails?.phone || "",
      });
    }
    setIsOpen(open);
  };

  return (
    <>
      <Button
        variant="outline"
        className="bg-white border border-gray-200 text-black shadow-none hover:bg-transparent cursor-pointer px-3 sm:px-4 py-3 sm:py-5 text-xs sm:text-sm flex items-center justify-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <Pencil className="w-4 h-4 mr-1" />
        Edit
      </Button>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Edit Branch Manager
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Update the branch manager information below.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form className="space-y-4">
              {/* Manager Name */}
              <FormField
                control={form.control}
                name="managerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Manager Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter manager name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Manager Email */}
              <FormField
                control={form.control}
                name="managerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Email Address *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Manager Phone */}
              <FormField
                control={form.control}
                name="managerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Phone Number *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-4"
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={form.handleSubmit(onSubmit)}
                  className="flex-1 bg-theme-dark-green hover:bg-theme-dark-green text-white py-4"
                  disabled={isPending}
                  isLoading={isPending}
                  loadingText="Updating..."
                >
                  Update Manager
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}