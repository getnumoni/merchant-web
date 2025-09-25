"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import * as React from "react"
import { Control, FieldPath, FieldValues, useController } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface ComboboxOption {
  value: string
  label: string
}

interface FormComboboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>
  name: TName
  label: string
  placeholder?: string
  options: ComboboxOption[]
  disabled?: boolean
  required?: boolean
  className?: string
  searchPlaceholder?: string
  emptyMessage?: string
}

export function FormCombobox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  placeholder = "Select option...",
  options,
  disabled = false,
  required = false,
  className = "",
  searchPlaceholder = "Search...",
  emptyMessage = "No option found.",
}: FormComboboxProps<TFieldValues, TName>) {
  const [open, setOpen] = React.useState(false)

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    rules: { required: required ? `${label} is required` : false },
  })

  const selectedOption = options.find((option) => option.value === field.value)

  return (
    <div className={cn("space-y-2", className)}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "w-full justify-between h-12 px-3 py-2 text-left font-normal",
              !selectedOption && "text-gray-500",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500"
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput
              placeholder={searchPlaceholder}
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {options.map((option, index) => (
                  <CommandItem
                    key={`${option.value}-${index}`}
                    value={option.value}
                    onSelect={(currentValue) => {
                      field.onChange(currentValue === field.value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        field.value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && (
        <p className="text-red-500 text-xs mt-1">{error.message}</p>
      )}
    </div>
  )
}
