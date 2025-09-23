'use client';

import { countries, nigerianStates } from '@/lib/schemas/merchant-schema';
import { DropdownState, FormComponentProps } from '@/lib/types/admin';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';



export default function ContactInformation({ formData, setFormData, errors }: FormComponentProps) {
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
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>

      {/* First Row - 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Contact Person Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person Name</label>
          <input
            type="text"
            value={formData.contactPersonName || ''}
            onChange={(e) => handleInputChange('contactPersonName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.contactPersonName ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Shai Hulud"
          />
          {errors.contactPersonName && <p className="text-red-500 text-xs mt-1">{errors.contactPersonName}</p>}
        </div>

        {/* Contact Email Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email Address</label>
          <input
            type="email"
            value={formData.contactEmailAddress || ''}
            onChange={(e) => handleInputChange('contactEmailAddress', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.contactEmailAddress ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="shaihulud@gmail.com"
          />
          {errors.contactEmailAddress && <p className="text-red-500 text-xs mt-1">{errors.contactEmailAddress}</p>}
        </div>

        {/* Contact Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone Number</label>
          <div className="flex">
            <div className="relative">
              <select className="px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="+234">🇳🇬 +234</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
              </select>
            </div>
            <input
              type="tel"
              value={formData.contactPhoneNumber || ''}
              onChange={(e) => handleInputChange('contactPhoneNumber', e.target.value)}
              className={`flex-1 px-3 py-2 border border-l-0 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.contactPhoneNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="701 234 5678"
            />
          </div>
          {errors.contactPhoneNumber && <p className="text-red-500 text-xs mt-1">{errors.contactPhoneNumber}</p>}
        </div>
      </div>

      {/* Second Row - 4 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Contact Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Address</label>
          <input
            type="text"
            value={formData.contactAddress || ''}
            onChange={(e) => handleInputChange('contactAddress', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.contactAddress ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Shai Hulud"
          />
          {errors.contactAddress && <p className="text-red-500 text-xs mt-1">{errors.contactAddress}</p>}
        </div>

        {/* Contact Country */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('contactCountry')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-between ${errors.contactCountry ? 'border-red-500' : 'border-gray-300'
                }`}
            >
              <span className={formData.contactCountry ? 'text-gray-900' : 'text-gray-500'}>
                {formData.contactCountry || 'Choose a country'}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {openDropdowns.contactCountry && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {countries.map((country) => (
                  <button
                    key={country}
                    type="button"
                    onClick={() => handleSelectOption('contactCountry', country)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  >
                    {country}
                  </button>
                ))}
              </div>
            )}
          </div>
          {errors.contactCountry && <p className="text-red-500 text-xs mt-1">{errors.contactCountry}</p>}
        </div>

        {/* Contact State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('contactState')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-between ${errors.contactState ? 'border-red-500' : 'border-gray-300'
                }`}
            >
              <span className={formData.contactState ? 'text-gray-900' : 'text-gray-500'}>
                {formData.contactState || 'Select a state'}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {openDropdowns.contactState && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {nigerianStates.map((state) => (
                  <button
                    key={state}
                    type="button"
                    onClick={() => handleSelectOption('contactState', state)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  >
                    {state}
                  </button>
                ))}
              </div>
            )}
          </div>
          {errors.contactState && <p className="text-red-500 text-xs mt-1">{errors.contactState}</p>}
        </div>

        {/* Contact City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <input
            type="text"
            value={formData.contactCity || ''}
            onChange={(e) => handleInputChange('contactCity', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.contactCity ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Ketu"
          />
          {errors.contactCity && <p className="text-red-500 text-xs mt-1">{errors.contactCity}</p>}
        </div>
      </div>
    </div>
  );
}
