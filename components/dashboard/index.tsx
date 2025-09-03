import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { blueVerifiedIcon, rightArrowIcon } from "@/constant/icons";
import { qrCode, sampleUserIcon } from "@/constant/images";
import { Coins, Download, Share, Store, Users } from "lucide-react";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white rounded-2xl p-6">
      {/* Brand Profile Card */}
      <Card className="shadow-none border-none rounded-2xl p-6 bg-[#FAFAFA]">
        <div className="flex flex-col items-center text-center">
          <div className=" rounded-2xl p-4 mb-4">
            <Image src={sampleUserIcon} alt="Chicken Republic" width={80} height={80} className="rounded-full" />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl font-bold text-gray-900">Chicken Republic</h2>
            <Image src={blueVerifiedIcon} alt="verified-badge" width={20} height={20} />
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Merchant ID: <span className="text-green-600 font-medium">#nu225577</span>
          </p>
          <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50">
            Account Settings
            <Image src={rightArrowIcon} alt="arrow-right" width={20} height={20} />
          </Button>
        </div>
      </Card>

      {/* QR Code Card */}
      <Card className="border-1 shadow-none rounded-2xl p-4">
        <div className="flex items-start gap-4 mb-4">
          <Image src={qrCode} alt="QR Code" width={170} height={170} className="rounded-lg flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Brand&apos;s QR Code</h3>
            <p className="text-sm text-gray-600">
              Print your store&apos;s QR code and display it for customers. They can scan to make quick transfers.
            </p>
          </div>

        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Download
          </Button>
          <Button className="flex-1 flex items-center justify-center gap-2 bg-black hover:bg-gray-800">
            <Share className="w-4 h-4" />
            Share
          </Button>
        </div>
      </Card>

      {/* Brand Summary Card */}
      <Card className="shadow-sm border border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Brand Summary</h3>
        <p className="text-sm text-gray-600 mb-6">
          Get quick insight on your brand and operations.
        </p>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Store className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Onboarded Branches</p>
              <p className="text-xl font-bold text-gray-900">0</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Coins className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Available Brand Points</p>
              <p className="text-xl font-bold text-gray-900">#16,217.90</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Customers</p>
              <p className="text-xl font-bold text-gray-900">54,9181</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}