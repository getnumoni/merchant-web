import { avatarIcon, calenderIcon, emailIcon, facebookIcon, greenLocationIcon, instagramIcon, moniepointIcon, phoneIcon, twitterIcon, whatsappIcon } from "@/constant/icons";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightWhiteIcon } from "../common/icon-svg";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function AboutBranch() {
  return <main className="bg-white rounded-2xl p-3 sm:p-4 lg:p-6 my-4">
    <div className="flex flex-row sm:items-center justify-between gap-2 sm:gap-4">
      <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900">About Branch</h2>
      <Badge variant="outline" className="bg-green-100 text-theme-dark-green border-theme-dark-green/10 px-2 py-1 rounded-full text-xs sm:text-sm w-fit">
        Active
      </Badge>
    </div>
    <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-3 sm:mt-4 leading-relaxed">Lorem ipsum dolor sit amet consectetur. Lorem maecenas sem vestibulum condimentum cursus et maecenas. Leo ullamcorper erat montes magna libero egestas lectus. Neque enim aliquet eget neque.</p>
    <hr className="border-gray-100 my-2 sm:my-3" />
    <div className="flex items-start sm:items-center gap-2 mt-3 sm:mt-4">
      <Image src={greenLocationIcon} alt="green-location-icon" width={16} height={16} className="sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0" />
      <p className="text-xs sm:text-sm lg:text-base text-black font-medium break-words">45 Sunny Plaza, Victoria Island Road</p>
    </div>
    <hr className="border-gray-100 my-2 sm:my-3" />
    <div className="flex items-start sm:items-center gap-2 mt-3 sm:mt-4">
      <Image src={calenderIcon} alt="calender-icon" width={16} height={16} className="sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 sm:mt-0" />
      <p className="text-xs sm:text-sm lg:text-base text-gray-600">Added On: <span className="text-black font-medium">January 16, 2025.</span></p>
    </div>

    <section className="mt-4 sm:mt-6">
      <h1 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900">Branch Manager</h1>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mt-2 sm:mt-3 border-gray-100 rounded-2xl p-3 sm:p-4 lg:p-6 border">
        <Image src={avatarIcon} alt="profile-icon" width={80} height={80} className="sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full flex-shrink-0 mx-auto sm:mx-0" />
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm sm:text-base lg:text-lg text-black font-medium">Joan Constantine</p>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1">Branch Manager</p>
          <hr className="border-gray-100 my-2 sm:my-3" />
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
              <Image src={phoneIcon} alt="phone-icon" width={16} height={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
              <Link href="tel:+2348145679001" className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium break-all">+2348145679001</Link>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
              <Image src={emailIcon} alt="email-icon" width={16} height={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
              <Link href="mailto:joanconstantine@gmail.com" className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium break-all">joanconstantine@gmail.com</Link>
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
          <p className="text-sm sm:text-base lg:text-lg text-black font-medium">Chicken Republic Ikeja</p>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1">Bank: <span className="text-black font-medium">Moniepoint</span></p>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1">Date Linked: <span className="text-black font-medium">January 16, 2025.</span></p>
        </div>
      </div>
    </section>


    {/* social media */}
    <section className="mt-4 sm:mt-6">
      <h1 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900">Social Media Profiles</h1>
      <div className="mt-2 sm:mt-3 bg-theme-gray rounded-2xl p-3 sm:p-4 lg:p-6">
        {/* WhatsApp */}
        <div className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-100 last:border-b-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <Image src={whatsappIcon} alt="whatsapp" width={20} height={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full flex-shrink-0" />
            <span className="text-xs sm:text-sm lg:text-base font-medium text-gray-900 truncate">WhatsApp</span>
          </div>
          <Button className="px-2 sm:px-3 py-1 sm:py-1.5 text-green-600 rounded-lg text-xs sm:text-sm font-medium transition-colors border-none bg-white hover:bg-white shadow-none flex-shrink-0">
            <span className="hidden sm:inline">View</span>
            <span className="sm:hidden">View</span>
            <ArrowRightWhiteIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
          </Button>
        </div>

        {/* Facebook */}
        <div className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-100 last:border-b-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <Image src={facebookIcon} alt="facebook" width={20} height={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full flex-shrink-0" />
            <span className="text-xs sm:text-sm lg:text-base font-medium text-gray-900 truncate">Facebook</span>
          </div>
          <Button className="px-2 sm:px-3 py-1 sm:py-1.5 text-green-600 rounded-lg text-xs sm:text-sm font-medium transition-colors border-none bg-white hover:bg-white shadow-none flex-shrink-0">
            <span className="hidden sm:inline">View</span>
            <span className="sm:hidden">View</span>
            <ArrowRightWhiteIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
          </Button>
        </div>

        {/* Instagram */}
        <div className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-100 last:border-b-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <Image src={instagramIcon} alt="instagram" width={20} height={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full flex-shrink-0" />
            <span className="text-xs sm:text-sm lg:text-base font-medium text-gray-900 truncate">Instagram</span>
          </div>
          <Button className="px-2 sm:px-3 py-1 sm:py-1.5 text-green-600 rounded-lg text-xs sm:text-sm font-medium transition-colors border-none bg-white hover:bg-white shadow-none flex-shrink-0">
            <span className="hidden sm:inline">View</span>
            <span className="sm:hidden">View</span>
            <ArrowRightWhiteIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
          </Button>
        </div>

        {/* X (Twitter) */}
        <div className="flex items-center justify-between py-2 sm:py-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <Image src={twitterIcon} alt="twitter" width={20} height={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full flex-shrink-0" />
            <span className="text-xs sm:text-sm lg:text-base font-medium text-gray-900 truncate">X(Twitter)</span>
          </div>
          <Button className="px-2 sm:px-3 py-1 sm:py-1.5 text-green-600 rounded-lg text-xs sm:text-sm font-medium transition-colors border-none bg-white hover:bg-white shadow-none flex-shrink-0">
            <span className="hidden sm:inline">View</span>
            <span className="sm:hidden">View</span>
            <ArrowRightWhiteIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  </main>
}