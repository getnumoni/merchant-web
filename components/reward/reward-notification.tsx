import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

interface RewardNotificationProps {
  text: string;
  icon: string;
  type: "pause" | "pending" | "info" | "warning" | "success";
  textColor?: string;
  bgColor?: string;
  className?: string;
  delay?: number;
  duration?: number;
}

const notificationStyles = {
  pause: {
    bgColor: "#FFEDEC",
    textColor: "#000000",
    iconColor: "#EF4444"
  },
  pending: {
    bgColor: "#E7ECFA",
    textColor: "#000000",
    iconColor: "#6366F1"
  },
  info: {
    bgColor: "#F0F9FF",
    textColor: "#000000",
    iconColor: "#3B82F6"
  },
  warning: {
    bgColor: "#FEF3C7",
    textColor: "#000000",
    iconColor: "#F59E0B"
  },
  success: {
    bgColor: "#ECFDF5",
    textColor: "#000000",
    iconColor: "#10B981"
  }
};

export default function RewardNotification({
  text,
  icon,
  type,
  textColor,
  bgColor,
  className,
  delay = 0,
  duration = 0.5
}: RewardNotificationProps) {
  const style = notificationStyles[type];
  const finalBgColor = bgColor || style.bgColor;
  const finalTextColor = textColor || style.textColor;

  // Animation variants
  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay,
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const iconVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotate: -10
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const textVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -10
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg w-full cursor-pointer justify-center",
        className
      )}
      style={{
        backgroundColor: finalBgColor,
        color: finalTextColor
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      <motion.div className="flex items-center gap-3">
        <motion.div
          className="flex-shrink-0"
          variants={iconVariants}
        >
          <Image
            src={icon}
            alt="Notification icon"
            width={20}
            height={20}
            className="w-5 h-5"
          />
        </motion.div>
        <motion.div
          className="flex-1"
          variants={textVariants}
        >
          <p className="text-xs font-medium leading-5">
            {text}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}