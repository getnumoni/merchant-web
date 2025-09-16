import { Button } from "@/components/ui/button";
import { ErrorDisplayProps } from "@/lib/types";

export default function ErrorDisplay({
  error,
  isError,
  onRetry,
  className = ""
}: ErrorDisplayProps) {
  if (!isError || !error) return null;

  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-5 h-5 text-red-500">⚠️</div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-red-800">Error loading data</h3>
          <p className="text-sm text-red-600 mt-1">{error}</p>
          {onRetry && (
            <div className="mt-3">
              <Button
                onClick={onRetry}
                variant="outline"
                size="sm"
                className="text-red-700 border-red-300 hover:bg-red-100"
              >
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
