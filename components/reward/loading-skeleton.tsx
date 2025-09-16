'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingSkeleton() {
  return (
    <main className="p-6 space-y-6">
      {/* Top Section - Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Budget Cap Card */}
        <div className="bg-white rounded-2xl p-6  border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="w-8 h-8" />
          </div>
          <Skeleton className="h-8 w-32 mb-2" />
          <div className="flex items-center gap-2">
            <Skeleton className="w-3 h-3" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>

        {/* Total Points Rewarded Card */}
        <div className="bg-white rounded-2xl p-6  border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="w-8 h-8" />
          </div>
          <Skeleton className="h-8 w-16 mb-2" />
          <div className="flex items-center gap-2">
            <Skeleton className="w-3 h-3" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* Total Points Balance Card */}
        <div className="bg-white rounded-2xl p-6  border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="w-8 h-8" />
          </div>
          <Skeleton className="h-8 w-32 mb-2" />
          <div className="flex items-center gap-2">
            <Skeleton className="w-3 h-3" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>

        {/* Customer Pool Card */}
        <div className="bg-white rounded-2xl p-6  border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="w-8 h-8" />
          </div>
          <Skeleton className="h-8 w-12 mb-2" />
          <div className="flex items-center gap-2">
            <Skeleton className="w-3 h-3" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </section>

      {/* Bottom Section - Point Insights & Analytics */}
      <section className="bg-white rounded-2xl p-6  border border-gray-100">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
          <Skeleton className="h-6 w-48" />

          {/* Tab buttons */}
          <div className="flex gap-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-36" />
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Sub-section - Reward Table */}
          <div>
            <Skeleton className="h-5 w-32 mb-4" />
            <div className="space-y-3">
              {/* Table header */}
              <div className="grid grid-cols-3 gap-4 pb-2 border-b border-gray-200">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-16" />
              </div>
              {/* Table rows */}
              {[1, 2, 3, 4, 5].map((row) => (
                <div key={row} className="grid grid-cols-3 gap-4 py-2">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-8" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Sub-section - Table Summary */}
          <div>
            <Skeleton className="h-5 w-24 mb-4" />
            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Skeleton className="w-5 h-5" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
