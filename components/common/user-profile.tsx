'use client';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { profileIcon } from '@/constant/icons';
import Image from 'next/image';
import Link from 'next/link';

export default function UserProfile() {
  return (
    <Menubar className="bg-transparent border-none shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-transparent focus:bg-none rounded-full focus:outline-none focus:ring-2 border ">
          {/* User Avatar - Chicken Republic logo placeholder */}
          <div className="h-8 w-8 rounded-full flex items-center justify-center">
            <Image src={profileIcon} alt="profile-icon" width={32} height={32} />
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-sm font-medium text-gray-900">John Doe</div>
            <div className="text-xs text-gray-500">Main Brand Profile</div>
          </div>
          <div className="hidden sm:block w-px h-6 bg-gray-300 mx-2"></div>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </MenubarTrigger>
        <MenubarContent className="w-48">
          <MenubarItem>
            <Link href="#" className="w-full">Profile</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="#" className="w-full">Settings</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="#" className="w-full">Sign out</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
