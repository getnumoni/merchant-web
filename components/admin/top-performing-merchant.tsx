'use client';


const merchants = [
  {
    id: 1,
    name: 'Chicken Republic',
    pointsIssued: '₦ 9.3K',
    logo: '🍗',
    trend: '+12%',
    trendType: 'positive' as const
  },
  {
    id: 2,
    name: "Domino's Pizza",
    pointsIssued: '₦ 8.2K',
    logo: '🍕',
    trend: '+8%',
    trendType: 'positive' as const
  },
  {
    id: 3,
    name: 'Debonairs Pizza',
    pointsIssued: '₦ 8.2K',
    logo: '🍕',
    trend: '+5%',
    trendType: 'positive' as const
  }
];

export default function TopPerformingMerchant() {
  return (
    <div className="bg-white rounded-xl p-3 border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold text-gray-900">Top Performing Merchants</h3>
      </div>

      <div className="space-y-1">
        {merchants.map((merchant, index) => (
          <div key={merchant.id} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-6 h-6 rounded bg-white shadow-sm">
                <span className="text-sm">{merchant.logo}</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 text-xs">{merchant.name}</p>
                <p className="text-xs text-gray-500">{merchant.pointsIssued} Points</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <span className={`text-xs font-medium ${merchant.trendType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                {merchant.trend}
              </span>
              <div className="w-1 h-1 bg-gray-300 rounded-full">
                <div className={`w-1 h-1 rounded-full ${index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'
                  }`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}