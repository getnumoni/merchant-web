import { musicPauseIcon, successIconCheck, warningIcon } from "@/constant/icons";
import RewardNotification from "./reward-notification";

export default function NotificationExamples() {
  return (
    <div className="space-y-4 p-4">
      {/* Info Notification */}
      <RewardNotification
        text="Reward System Will Be Paused When Allocated Amount Has Been Exhausted."
        icon={warningIcon}
        type="info"
        delay={0}
        duration={0.6}
      />

      {/* Pause Notification */}
      <RewardNotification
        text="Your Reward Cap Has Been Reached. Rewards Are Paused Automatically. Edit The Cap To Resume."
        icon={musicPauseIcon}
        type="pause"
        delay={0.2}
        duration={0.6}
      />

      {/* Pending Notification */}
      <RewardNotification
        text="Reward processing is pending. Please wait for confirmation."
        icon={warningIcon}
        type="pending"
        delay={0.4}
        duration={0.6}
      />

      {/* Success Notification */}
      <RewardNotification
        text="Reward has been successfully processed and credited to your account."
        icon={successIconCheck}
        type="success"
        delay={0.6}
        duration={0.6}
      />

      {/* Custom colors example */}
      <RewardNotification
        text="Custom notification with custom colors and animation."
        icon={warningIcon}
        type="info"
        bgColor="#F3E8FF"
        textColor="#7C3AED"
        delay={0.8}
        duration={0.8}
      />
    </div>
  );
}
