

'use client';

import { businessCategories, businessTypes, countries, nigerianStates } from '@/lib/schemas/merchant-schema';
import { DropdownState, FormComponentProps } from '@/lib/types/admin';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function BusinessInformation({ formData, setFormData, errors }: FormComponentProps) {
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
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Business Information</h2>

      {/* Top Section - 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
          <input
            type="text"
            value={formData.businessName || ''}
            onChange={(e) => handleInputChange('businessName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.businessName ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Shai Hulud"
          />
          {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={formData.emailAddress || ''}
            onChange={(e) => handleInputChange('emailAddress', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.emailAddress ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="shaihulud@gmail.com"
          />
          {errors.emailAddress && <p className="text-red-500 text-xs mt-1">{errors.emailAddress}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
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
              value={formData.phoneNumber || ''}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className={`flex-1 px-3 py-2 border border-l-0 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="701 234 5678"
            />
          </div>
          {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
        </div>
      </div>

      {/* Middle Section - 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Business Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Category</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('businessCategory')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-between ${errors.businessCategory ? 'border-red-500' : 'border-gray-300'
                }`}
            >
              <span className={formData.businessCategory ? 'text-gray-900' : 'text-gray-500'}>
                {formData.businessCategory || 'Choose a category'}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {openDropdowns.businessCategory && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {businessCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleSelectOption('businessCategory', category)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
          {errors.businessCategory && <p className="text-red-500 text-xs mt-1">{errors.businessCategory}</p>}
        </div>

        {/* RC Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">RC Number</label>
          <input
            type="text"
            value={formData.rcNumber || ''}
            onChange={(e) => handleInputChange('rcNumber', e.target.value.toUpperCase())}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.rcNumber ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="RC3456KSV"
          />
          {errors.rcNumber && <p className="text-red-500 text-xs mt-1">{errors.rcNumber}</p>}
        </div>

        {/* Business Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('businessType')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-between ${errors.businessType ? 'border-red-500' : 'border-gray-300'
                }`}
            >
              <span className={formData.businessType ? 'text-gray-900' : 'text-gray-500'}>
                {formData.businessType || 'Choose a category'}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {openDropdowns.businessType && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {businessTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleSelectOption('businessType', type)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
          {errors.businessType && <p className="text-red-500 text-xs mt-1">{errors.businessType}</p>}
        </div>
      </div>

      {/* Address Section - 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Headquarter Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Headquarter Address</label>
          <input
            type="text"
            value={formData.headquarterAddress || ''}
            onChange={(e) => handleInputChange('headquarterAddress', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.headquarterAddress ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Shai Hulud"
          />
          {errors.headquarterAddress && <p className="text-red-500 text-xs mt-1">{errors.headquarterAddress}</p>}
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('country')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-between ${errors.country ? 'border-red-500' : 'border-gray-300'
                }`}
            >
              <span className={formData.country ? 'text-gray-900' : 'text-gray-500'}>
                {formData.country || 'Choose a country'}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {openDropdowns.country && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {countries.map((country) => (
                  <button
                    key={country}
                    type="button"
                    onClick={() => handleSelectOption('country', country)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  >
                    {country}
                  </button>
                ))}
              </div>
            )}
          </div>
          {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('state')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-between ${errors.state ? 'border-red-500' : 'border-gray-300'
                }`}
            >
              <span className={formData.state ? 'text-gray-900' : 'text-gray-500'}>
                {formData.state || 'Select a state'}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {openDropdowns.state && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {nigerianStates.map((state) => (
                  <button
                    key={state}
                    type="button"
                    onClick={() => handleSelectOption('state', state)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  >
                    {state}
                  </button>
                ))}
              </div>
            )}
          </div>
          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
        </div>
      </div>

      {/* City Section - 1 Column */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <input
            type="text"
            value={formData.city || ''}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Ketu"
          />
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
        </div>
      </div>

      {/* Bottom Section - 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Description</label>
          <textarea
            value={formData.businessDescription || ''}
            onChange={(e) => handleInputChange('businessDescription', e.target.value)}
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.businessDescription ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Tell us about your business"
          />
          {errors.businessDescription && <p className="text-red-500 text-xs mt-1">{errors.businessDescription}</p>}
        </div>

        {/* Password Fields */}
        <div className="space-y-4">
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={formData.password || ''}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="XXXXXXXXXXXX"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword || ''}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="XXXXXXXXXXXX"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
