import { Button } from "@/components/ui/button";
import { rightArrowIcon } from "@/constant/icons";
import { REWARD_TABLE_URL } from "@/constant/routes";
import useGetBranchAnalysis from "@/hooks/query/useGetBranchAnalysis";
import Image from "next/image";
import Link from "next/link";
import PointDistributionChart from "../branch-level/point-distribution-chart";
import TopPerformingBranch from "../branch-level/top-performing-branch";

export default function PointsDistribution() {
  const { data, isPending, isError, error } = useGetBranchAnalysis();


  const branchAnalysisData = data?.data?.data;

  return (
    <main className="bg-white rounded-2xl p-4 my-4">
      <div className="flex items-center gap-3 ">
        <h1 className="text-lg font-semibold text-gray-900">Points Distribution Summary</h1>
        <Link href={REWARD_TABLE_URL}>
          <Button className="bg-[#F5F5F5] border border-[#EAEAEA]  text-black rounded-lg p-3 flex items-center gap-2 shadow-none hover:bg-[#EAEAEA] cursor-pointer ">

            Go to reward table
            <Image src={rightArrowIcon} alt="arrow-right" width={20} height={20} />
          </Button>
        </Link>
      </div>
      <hr className="border-gray-50 my-3" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
        <PointDistributionChart isPending={isPending} isError={isError} error={error} data={branchAnalysisData} />
        <TopPerformingBranch isPending={isPending} isError={isError} error={error} data={branchAnalysisData} />
      </div>
    </main>
  )
}