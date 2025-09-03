'use client';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { crownIcon, messageIcon, notificationIcon } from '@/constant/icons';
import { getPageTitle } from '@/lib/helper';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserProfile from './user-profile';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {

  const pathname = usePathname();

  // Function to get action button based on current page
  const getActionButton = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];

    if (lastSegment === 'branch-level' || pathname.includes('branch-level')) {
      return (
        <button className="flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Branch
        </button>
      );
    }

    // Default to Quick Links for Dashboard and other pages
    return (
      <Menubar className="border-0 bg-transparent shadow-none">
        <MenubarMenu>
          <MenubarTrigger className="flex items-center px-5 py-3 text-sm font-medium text-white bg-theme-dark-green rounded-2xl hover:bg-theme-green focus:outline-none focus:ring-2 focus:ring-green-500 data-[state=open]:bg-theme-green">
            Quick Links
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </MenubarTrigger>
          <MenubarContent className="w-48">
            <MenubarItem>
              <Link href="#" className="w-full">Link 1</Link>
            </MenubarItem>
            <MenubarItem>
              <Link href="#" className="w-full">Link 2</Link>
            </MenubarItem>
            <MenubarItem>
              <Link href="#" className="w-full">Link 3</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  };



  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40 lg:left-64">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Mobile menu button and Dashboard title */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex items-center space-x-4">
              {/* Page title */}
              <h1 className="ml-2 lg:ml-0 text-2xl font-semibold text-gray-900">
                {getPageTitle(pathname)}
              </h1>
              {/* Dynamic Action Button */}
              <div className="md:flex hidden">
                {getActionButton()}
              </div>
            </div>
          </div>

          {/* Right side - Quick Links, Upgrade, Notifications, User Profile */}
          <div className="flex items-center space-x-4">
            {/* Upgrade Business */}
            <button className="md:flex hidden items-center px-4 py-4 text-sm font-medium bg-white   hover:bg-gray-50  text-black relative overflow-hidden">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500 to-green-500 p-[2px]">
                <div className="w-full h-full bg-white rounded-full"></div>
              </div>
              <div className="relative flex items-center">
                <Image src={crownIcon} alt="crown" className="mr-2" width={22} height={22} />
                <span className="text-md font-medium">Upgrade Business</span>
              </div>
            </button>

            {/* Chat Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 border">
              <Image src={messageIcon} alt="message" width={32} height={32} />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                43
              </span>
            </button>

            {/* Bell Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 border">
              <Image src={notificationIcon} alt="notification" width={32} height={32} />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                43
              </span>
            </button>

            {/* User Profile */}
            <UserProfile />
          </div>
        </div>
      </div>
    </nav>
  );
}