'use client';

import { banks } from '@/lib/schemas/merchant-schema';
import { DropdownState, FormComponentProps } from '@/lib/types/admin';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function PayoutInformation({ formData, setFormData, errors }: FormComponentProps) {
  const [openDropdowns, setOpenDropdowns] = useState<DropdownState>({});

  const toggleDropdown = (field: string) => {
    setOpenDropdowns(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectOption = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setOpenDropdowns(prev => ({ ...prev, [field]: false }));
  };

  return (
    <div className="m-6 border border-gray-100 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Payout Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Business Name (Bank Dropdown) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('bankName')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-between ${errors.bankName ? 'border-red-500' : 'border-gray-300'
                }`}
            >
              <span className={formData.bankName ? 'text-gray-900' : 'text-gray-500'}>
                {formData.bankName || 'Choose a bank name'}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {openDropdowns.bankName && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {banks.map((bank) => (
                  <button
                    key={bank}
                    type="button"
                    onClick={() => handleSelectOption('bankName', bank)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  >
                    {bank}
                  </button>
                ))}
              </div>
            )}
          </div>
          {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>}
        </div>

        {/* Bank Account Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bank Account Number</label>
          <input
            type="text"
            value={formData.bankAccountNumber || ''}
            onChange={(e) => handleInputChange('bankAccountNumber', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.bankAccountNumber ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="0123456789"
          />
          {errors.bankAccountNumber && <p className="text-red-500 text-xs mt-1">{errors.bankAccountNumber}</p>}
        </div>

        {/* Account Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
          <input
            type="text"
            value={formData.accountName || ''}
            onChange={(e) => handleInputChange('accountName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.accountName ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Shai Hulud"
          />
          {errors.accountName && <p className="text-red-500 text-xs mt-1">{errors.accountName}</p>}
        </div>
      </div>
    </div>
  );
}
