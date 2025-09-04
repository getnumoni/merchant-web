export default function CustomersScore() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-base sm:text-lg font-semibold text-gray-900">Customers Score</h2>
      <div className="space-y-3 sm:space-y-4">
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          Track and analyze customer engagement scores across different reward tiers.
          This section provides insights into how customers are performing based on their
          point accumulation and reward redemption patterns.
        </p>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          Monitor customer satisfaction levels, engagement rates, and overall performance
          metrics to optimize your reward program strategy and improve customer retention.
        </p>
        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            <strong>Coming Soon:</strong> Interactive charts and detailed analytics will be
            available to help you understand customer behavior patterns and optimize your
            reward system for maximum engagement.
          </p>
        </div>
      </div>
    </div>
  );
}