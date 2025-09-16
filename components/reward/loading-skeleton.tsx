'use client';

export default function LoadingSkeleton() {
  return (
    <main>
      <main className="bg-white rounded-2xl p-6">
        <section className="flex flex-col lg:flex-row gap-6">
          {/* Custom Reward Tables Section Skeleton */}
          <div className="flex-[2] bg-theme-dark-green rounded-2xl p-8 relative overflow-hidden flex flex-col items-center justify-center text-center">
            <div className="h-12 bg-white/20 rounded-lg w-80 mb-8 animate-pulse"></div>

            {/* Central Illustration Skeleton */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-[300px] h-[300px] bg-white/20 rounded-lg animate-pulse"></div>
            </div>

            <div className="h-6 bg-white/20 rounded w-96 animate-pulse"></div>
          </div>

          {/* What You Can Do Section Skeleton */}
          <div className="flex-1 bg-[#FAFAFA] border border-gray-100 rounded-2xl p-6">
            <div className="h-6 bg-gray-300 rounded w-40 mb-6 animate-pulse"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start gap-3 bg-white rounded-lg p-4 border-gray-100 border">
                  <div className="w-6 h-6 bg-gray-300 rounded mt-1 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section Skeleton */}
          <div className="flex-1 bg-[#FAFAFA] border border-gray-100 rounded-2xl p-6">
            <div className="h-6 bg-gray-300 rounded w-20 mb-6 animate-pulse"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start gap-3 bg-white rounded-lg p-4 border-gray-100 border">
                  <div className="w-6 h-6 bg-gray-300 rounded mt-1 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <section className="max-w-xs mx-auto flex flex-col items-center justify-center gap-4 bg-white rounded-2xl p-6 my-4">
        <div className="h-6 bg-gray-300 rounded w-64 animate-pulse"></div>
        <div className="h-14 bg-gray-300 rounded-lg w-full animate-pulse"></div>
      </section>
    </main>
  );
}
