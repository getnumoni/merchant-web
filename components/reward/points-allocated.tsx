import EmptyPointAllocation from "./empty-point-allocation";
import PointAllocationDashboard from "./point-allocation-dashboard";

export default function PointsAllocated() {
  const isEmpty = false;
  return (
    <div className="space-y-4 sm:space-y-6">
      {isEmpty ? <EmptyPointAllocation /> : <PointAllocationDashboard />}
    </div>
  );
}