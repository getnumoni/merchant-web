import { calenderIcon, emailIcon, greenLocationIcon, moniepointIcon, phoneIcon } from "@/constant/icons";
import { getStatusColor, getStatusText } from "@/lib/helper";
import { singleBranchDetails } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import SocialMediaProfiles from "./social-media-profiles";

export default function AboutBranch({ singleBranch }: { singleBranch: singleBranchDetails }) {
  const { description, linkedin, instagram, managerProfilePhoto, snapchat, x, website, address, whatsApp, status } = singleBranch;

  return <main className="bg-white rounded-2xl p-3 sm:p-4 lg:p-6 my-4">
    <div className="flex flex-row sm:items-center justify-between gap-2 sm:gap-4">
      <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900">About Branch</h2>
      <Badge variant="outline" className={`bg-green-100 text-theme-dark-green border-theme-dark-green/10 px-2 py-1 rounded-full text-xs sm:text-sm w-fit ${getStatusColor(status)}`}>
        {getStatusText(status)}
      </Badge>
    </div>
    <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-3 sm:mt-4 leading-relaxed">
      {description}
    </p>
    <hr className="border-gray-100 my-2 sm:my-3" />
    <div className="flex items-start sm:items-center gap-2 mt-3 sm:mt-4">
      <Image src={greenLocationIcon} alt="green-location-icon" width={16} height={16} className="sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0" />
      <p className="text-xs sm:text-sm lg:text-base text-black font-medium break-words">
        {address}
      </p>
    </div>
    <hr className="border-gray-100 my-2 sm:my-3" />
    <div className="flex items-start sm:items-center gap-2 mt-3 sm:mt-4">
      <Image src={calenderIcon} alt="calender-icon" width={16} height={16} className="sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0" />
      <p className="text-xs sm:text-sm lg:text-base text-gray-600">Added On: <span className="text-black font-medium">January 16, 2025.</span></p>
    </div>

    {/* branch manager */}
    <section className="mt-4 sm:mt-6">
      <h1 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900">Branch Manager</h1>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mt-2 sm:mt-3 border-gray-100 rounded-2xl p-3 sm:p-4 lg:p-6 border">
        <Image src={managerProfilePhoto} alt="profile-icon" width={80} height={80} className="sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full flex-shrink-0 mx-auto sm:mx-0 border border-gray-100" />
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm sm:text-base lg:text-lg text-black font-medium">{singleBranch.managerDetails?.name}</p>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1">Branch Manager</p>
          <hr className="border-gray-100 my-2 sm:my-3" />
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
              <Image src={phoneIcon} alt="phone-icon" width={16} height={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
              <Link href={`tel:${singleBranch.managerDetails?.phone}`} className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium break-all">{singleBranch.managerDetails?.phone}</Link>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
              <Image src={emailIcon} alt="email-icon" width={16} height={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
              <Link href={`mailto:${singleBranch.managerDetails?.email}`} className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium break-all">{singleBranch.managerDetails?.email}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* collection account */}
    <section className="mt-4 sm:mt-6">
      <h1 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900">Collection Account</h1>
      <div className="flex items-start gap-3 sm:gap-4 mt-2 sm:mt-3 border-gray-100 rounded-2xl p-3 sm:p-4 lg:p-6 border">
        <Image src={moniepointIcon} alt="profile-icon" width={32} height={32} className="sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm sm:text-base lg:text-lg text-black font-medium">{singleBranch.bankAccountName}</p>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1">Bank: <span className="text-black font-medium">Moniepoint</span></p>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1">Date Linked: <span className="text-black font-medium">January 16, 2025.</span></p>
        </div>
      </div>
    </section>


    {/* Social Media Profiles */}
    <SocialMediaProfiles
      socialMedia={{
        whatsApp,
        instagram,
        x,
        linkedin,
        snapchat,
        website
      }}
    />
  </main>
}