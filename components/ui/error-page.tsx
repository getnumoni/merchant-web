"use client";

import { motion } from "framer-motion";
import { AlertCircle, Home, RefreshCw, WifiOff } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

interface ErrorPageProps {
  error?: Error | null;
  onRetry?: () => void;
  onGoHome?: () => void;
  title?: string;
  description?: string;
  showRetryButton?: boolean;
  showHomeButton?: boolean;
  className?: string;
}

export default function ErrorPage({
  error,
  onRetry,
  onGoHome,
  title = "Something went wrong",
  description = "We encountered an unexpected error. Please try again or contact support if the problem persists.",
  showRetryButton = true,
  showHomeButton = true,
  className = "",
}: ErrorPageProps) {
  const isNetworkError = error?.message?.toLowerCase().includes('network') ||
    error?.message?.toLowerCase().includes('fetch') ||
    error?.message?.toLowerCase().includes('connection');

  const getErrorIcon = () => {
    if (isNetworkError) {
      return <WifiOff className="h-16 w-16 text-red-500" />;
    }
    return <AlertCircle className="h-16 w-16 text-red-500" />;
  };

  const getErrorTitle = () => {
    if (isNetworkError) {
      return "Connection Error";
    }
    return title;
  };

  const getErrorDescription = () => {
    if (isNetworkError) {
      return "Unable to connect to our servers. Please check your internet connection and try again.";
    }
    return description;
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gray-50 px-4 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          className="flex justify-center mb-6"
        >
          {getErrorIcon()}
        </motion.div>

        {/* Error Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-2xl font-bold text-gray-900">
            {getErrorTitle()}
          </h1>

          <p className="text-gray-600 leading-relaxed">
            {getErrorDescription()}
          </p>

          {/* Error Details (for development) */}
          {process.env.NODE_ENV === 'development' && error?.message && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-left"
            >
              <p className="text-xs text-red-700 font-mono break-words">
                <strong>Error:</strong> {error.message}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="mt-8 space-y-3"
        >
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {showRetryButton && (
              <Button
                onClick={onRetry}
                className="flex items-center gap-2 bg-theme-dark-green hover:bg-theme-dark-green/90 text-white px-6 py-3"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            )}

            {showHomeButton && (
              <Button
                onClick={onGoHome}
                variant="outline"
                className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3"
              >
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            )}
          </div>

          {/* Additional Help */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className="text-sm text-gray-500"
          >
            <p>
              Need help? Contact our{" "}
              <Link
                href="mailto:support@numoni.com"
                className="text-theme-dark-green hover:underline font-medium"
              >
                support team
              </Link>
            </p>
          </motion.div>
        </motion.div>

      </motion.div>
    </div>
  );
}
