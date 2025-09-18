"use client";

import { socialMediaPlatforms } from "@/data";
import { formatUrl } from "@/lib/helper";
import { SocialMediaData } from "@/lib/types";
import Image from "next/image";
import { ArrowRightWhiteIcon } from "../common/icon-svg";
import { Button } from "../ui/button";

interface SocialMediaProfilesProps {
  socialMedia: SocialMediaData;
}

export default function SocialMediaProfiles({ socialMedia }: SocialMediaProfilesProps) {
  // Create array of available social media platforms by mapping data with social media URLs
  const socialPlatforms = socialMediaPlatforms
    .map(platform => ({
      ...platform,
      url: socialMedia[platform.key as keyof SocialMediaData] as string | null
    }))
    .filter(platform => platform.url && platform.url.trim() !== '');

  // If no social media platforms are available, don't render the section
  if (socialPlatforms.length === 0) {
    return null;
  }

  return (
    <section className="mt-4 sm:mt-6">
      <h1 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900">Social Media Profiles</h1>
      <div className="mt-2 sm:mt-3 bg-theme-gray rounded-2xl p-3 sm:p-4 lg:p-6">
        {socialPlatforms.map((platform, index) => (
          <div
            key={platform.key}
            className={`flex items-center justify-between py-2 sm:py-3 ${index < socialPlatforms.length - 1 ? 'border-b border-gray-100' : ''
              }`}
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <Image
                src={platform.icon}
                alt={platform.name}
                width={20}
                height={20}
                className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full flex-shrink-0"
              />
              <span className="text-xs sm:text-sm lg:text-base font-medium text-gray-900 truncate">
                {platform.name}
              </span>
            </div>
            <Button
              className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border-none bg-white hover:bg-white shadow-none flex-shrink-0"
              onClick={() => window.open(formatUrl(platform.url!, platform.key), '_blank')}
            >
              <span className={`${platform.color}`}>View</span>
              <ArrowRightWhiteIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
