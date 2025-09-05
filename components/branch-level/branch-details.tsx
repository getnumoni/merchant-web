import { sampleUserIcon } from "@/constant/images";
import Image from "next/image";

export default function BranchDetails() {
  return (
    <div>
      <section className="bg-white rounded-2xl p-4 my-4">
        <div className="bg-theme-gray rounded-2xl p-4">
          <div>
            <Image src={sampleUserIcon} alt="branch-logo" width={80} height={80} className="rounded-full" />
          </div>
        </div>
      </section>
    </div>
  );
}