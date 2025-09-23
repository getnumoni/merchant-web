'use client';

import { Heart } from 'lucide-react';

const charities = [
  {
    id: 1,
    name: 'AO Foundation',
    donation: '₦ 900.3K',
    logo: '❄️',
    trend: '+15%',
    trendType: 'positive' as const
  },
  {
    id: 2,
    name: 'FATE Foundation',
    donation: '₦ 900.3K',
    logo: '🌟',
    trend: '+12%',
    trendType: 'positive' as const
  },
  {
    id: 3,
    name: 'Ovie Brume Foundation',
    donation: '₦ 900.3K',
    logo: '👥',
    trend: '+8%',
    trendType: 'positive' as const
  }
];

export default function MostSupportedCharity() {
  return (
    <div className="bg-white rounded-xl p-3 border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-gray-900">Most Supported Charities</h3>
        <Heart className="h-3 w-3 text-red-500" />
      </div>

      <div className="space-y-1">
        {charities.map((charity, index) => (
          <div key={charity.id} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-6 h-6 rounded bg-white shadow-sm">
                <span className="text-sm">{charity.logo}</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 text-xs">{charity.name}</p>
                <p className="text-xs text-gray-500">{charity.donation} Donation</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <span className={`text-xs font-medium ${charity.trendType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                {charity.trend}
              </span>
              <div className="w-1 h-1 bg-gray-300 rounded-full">
                <div className={`w-1 h-1 rounded-full ${index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-gray-400' : 'bg-red-400'
                  }`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 pt-2 border-t border-gray-200">
        <button className="w-full text-xs text-blue-600 hover:text-blue-700 font-medium">
          View all charities →
        </button>
      </div>
    </div>
  );
}