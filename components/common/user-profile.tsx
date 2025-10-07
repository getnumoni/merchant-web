'use client';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import useGetMerchant from '@/hooks/query/useGetMerchant';
import { useBankStore } from '@/stores/bank-store';
import { usePayOnUsStore } from '@/stores/pay-on-us-store';
import { useUserAuthStore } from '@/stores/user-auth-store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function UserProfile() {
  const { user, isAuthenticated, clearUser } = useUserAuthStore();
  const { clearToken } = usePayOnUsStore();
  const { clearToken: clearBankToken } = useBankStore();
  const { data: merchant } = useGetMerchant();

  const merchantInfo = merchant?.data?.data;

  const router = useRouter();

  const handleSignOut = () => {
    clearUser();
    clearToken();
    clearBankToken();
    router.push('/auth/sign-in');
  };

  // If not authenticated, don't render the profile
  if (!isAuthenticated || !user) {
    return null;
  }

  // Extract username from email (everything before @)
  const displayName = user.username.includes('@')
    ? user.username.split('@')[0]
    : user.username;

  return (
    <Menubar className="bg-transparent border-none shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 hover:bg-transparent focus:bg-none rounded-full focus:outline-none focus:ring-2 border ">
          {/* User Avatar */}
          <div className="h-8 w-8 rounded-full flex items-center justify-center">
            {merchantInfo?.businessImagePath ? (
              <Image
                src={merchantInfo.businessImagePath}
                alt="profile-icon"
                width={32}
                height={32}
                className="rounded-full h-8 w-12"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-sm font-medium text-gray-900">{displayName}</div>
            <div className="text-xs text-gray-500">{user.usertype}</div>
            {/* <div className="text-xs font-medium text-gray-900">{merchantInfo?.brandName}</div> */}
          </div>
          <div className="hidden sm:block w-px h-6 bg-gray-300 mx-2"></div>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </MenubarTrigger>
        <MenubarContent className="w-48">
          {/* <MenubarItem>
            <Link href="#" className="w-full">Profile</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="#" className="w-full">Settings</Link>
          </MenubarItem> */}
          <MenubarItem>
            <button onClick={handleSignOut} className="w-full text-left">
              Sign out
            </button>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
