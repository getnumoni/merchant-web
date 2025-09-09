"use client";
import { musicPauseIcon, successIconCheck, warningIcon } from "@/constant/icons";
import { useState } from "react";
import RewardNotification from "./reward-notification";

export default function AnimatedNotificationDemo() {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleToggle = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Animated Reward Notifications</h2>
        <button
          onClick={handleToggle}
          className="bg-theme-dark-green text-white px-6 py-3 rounded-lg font-medium hover:bg-theme-dark-green-700 transition-colors"
        >
          {showNotifications ? "Hide Notifications" : "Show Notifications"}
        </button>
      </div>

      {showNotifications && (
        <div className="space-y-4 max-w-2xl mx-auto">
          {/* Staggered entrance animations */}
          <RewardNotification
            text="Reward System Will Be Paused When Allocated Amount Has Been Exhausted."
            icon={warningIcon}
            type="info"
            delay={0}
            duration={0.6}
          />

          <RewardNotification
            text="Your Reward Cap Has Been Reached. Rewards Are Paused Automatically. Edit The Cap To Resume."
            icon={musicPauseIcon}
            type="pause"
            delay={0.2}
            duration={0.6}
          />

          <RewardNotification
            text="Reward processing is pending. Please wait for confirmation."
            icon={warningIcon}
            type="pending"
            delay={0.4}
            duration={0.6}
          />

          <RewardNotification
            text="Reward has been successfully processed and credited to your account."
            icon={successIconCheck}
            type="success"
            delay={0.6}
            duration={0.6}
          />

          <RewardNotification
            text="Custom notification with custom colors and smooth animations."
            icon={warningIcon}
            type="info"
            bgColor="#F3E8FF"
            textColor="#7C3AED"
            delay={0.8}
            duration={0.8}
          />
        </div>
      )}
    </div>
  );
}
