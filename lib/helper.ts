/**
 * Converts a pathname to a readable page title
 * @param path - The pathname string (e.g., "/dashboard/branch-level")
 * @returns A formatted title (e.g., "Branch Level")
 */
export const getPageTitle = (path: string): string => {
  const pathSegments = path.split('/').filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];

  // Convert kebab-case or snake_case to Title Case
  return lastSegment
    ? lastSegment
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    : 'Dashboard';
};

/**
 * Converts a color to a class name
 * @param color - The color string (e.g., "green", "red", "gray")
 * @returns A class name (e.g., "bg-green-500", "bg-red-500", "bg-gray-400")
 */
export const getColorClass = (color: string) => {
  switch (color) {
    case 'green':
      return 'bg-green-500';
    case 'red':
      return 'bg-red-500';
    case 'gray':
      return 'bg-gray-400';
    default:
      return 'bg-gray-400';
  }
};

/**
 * Gets the appropriate Tailwind CSS class for bar chart colors
 * @param barColor - The bar color string (e.g., "orange", "red", "green")
 * @returns A Tailwind CSS background color class
 */
export const getBarColor = (barColor: string): string => {
  switch (barColor) {
    case 'orange': return 'bg-orange-400';
    case 'red': return 'bg-red-400';
    case 'green': return 'bg-green-400';
    default: return 'bg-gray-400';
  }
};

/**
 * Gets the appropriate Tailwind CSS ring color class for chart icons
 * @param ringColor - The ring color string (e.g., "red", "green", "black", "blue", "orange")
 * @returns A Tailwind CSS ring color class
 */
export const getRingColor = (ringColor: string): string => {
  switch (ringColor) {
    case 'red': return 'ring-red-500';
    case 'green': return 'ring-green-500';
    case 'black': return 'ring-black';
    case 'blue': return 'ring-blue-500';
    case 'orange': return 'ring-orange-500';
    default: return 'ring-gray-500';
  }
};

/**
 * Gets the appropriate Tailwind CSS class for indicator colors in lists
 * @param indicatorColor - The indicator color string (e.g., "red", "green", "black", "blue", "orange", "purple", "yellow")
 * @returns A Tailwind CSS background color class
 */
export const getIndicatorColor = (indicatorColor: string): string => {
  switch (indicatorColor) {
    case 'red': return 'bg-red-500';
    case 'green': return 'bg-green-500';
    case 'black': return 'bg-black';
    case 'blue': return 'bg-blue-500';
    case 'orange': return 'bg-orange-500';
    case 'purple': return 'bg-purple-500';
    case 'yellow': return 'bg-yellow-500';
    default: return 'bg-gray-500';
  }
};

/**
 * Formats a number value with proper locale formatting and decimal places
 * @param value - The numeric value to format
 * @returns A formatted string with commas and 2 decimal places (e.g., "12,345.67")
 */
export const formatValue = (value: number): string => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};