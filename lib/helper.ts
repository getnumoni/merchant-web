

/**
 * Determines if a navigation item should be marked as active based on the current path.
 * 
 * This function implements a hierarchical navigation system where only the most specific
 * matching route is considered active. It prevents multiple navigation items from being
 * active simultaneously when dealing with nested routes.
 * 
 * @param itemPath - The path of the navigation item to check (e.g., '/dashboard')
 * @param currentPath - The current URL pathname (e.g., '/dashboard/branch-level/1')
 * @param allPaths - Array of all available navigation paths for comparison
 * 
 * @returns `true` if the navigation item should be active, `false` otherwise
 * 
 * @example
 * ```typescript
 * const allPaths = ['/dashboard', '/dashboard/branch-level', '/dashboard/reward-table'];
 * 
 * // Exact match - always active
 * isNavigationItemActive('/dashboard', '/dashboard', allPaths); // true
 * 
 * // Child route with no more specific parent - active
 * isNavigationItemActive('/dashboard/branch-level', '/dashboard/branch-level/1', allPaths); // true
 * 
 * // Parent route when child exists - not active
 * isNavigationItemActive('/dashboard', '/dashboard/branch-level', allPaths); // false
 * 
 * // No match - not active
 * isNavigationItemActive('/dashboard', '/profile', allPaths); // false
 * ```
 * 
 * @remarks
 * The function uses a hierarchical approach:
 * 1. Exact matches are always active
 * 2. Child routes are only active if no more specific parent route exists
 * 3. Parent routes are inactive when a more specific child route matches
 * 
 * This prevents the common issue of both parent and child navigation items
 * being highlighted simultaneously in sidebar navigation.
 */
export const isNavigationItemActive = (itemPath: string, currentPath: string, allPaths: string[]) => {
  // Exact match is always active
  if (currentPath === itemPath) return true;

  // Check if current path is a child of this item
  if (!currentPath.startsWith(itemPath + '/')) return false;

  // Find the most specific matching parent route
  // A route is more specific if it's longer and the current path starts with it
  const moreSpecificPaths = allPaths.filter(path =>
    path !== itemPath &&
    path.length > itemPath.length &&
    (currentPath.startsWith(path + '/') || currentPath === path)
  );

  // Only active if no more specific route exists
  return moreSpecificPaths.length === 0;
};


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


export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  }).format(amount).replace('NGN', '₦');
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'closed':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case 'active':
      return 'Active';
    case 'closed':
      return 'Closed';
    case 'pending':
      return 'Pending';
    default:
      return 'Unknown';
  }
};

/**
 * Gets the appropriate Tailwind CSS class for icon colors in modals
 * @param color - The color string (e.g., "red", "green", "blue", "yellow", "gray")
 * @returns A Tailwind CSS text color class
 */
export const getIconColorClass = (color: string): string => {
  switch (color) {
    case 'red':
      return 'text-red-500';
    case 'green':
      return 'text-green-500';
    case 'blue':
      return 'text-blue-500';
    case 'yellow':
      return 'text-yellow-500';
    case 'gray':
      return 'text-gray-500';
    default:
      return 'text-red-500';
  }
};

/**
 * Gets button styles for custom colors in modals
 * @param variant - The button variant
 * @param color - Optional custom color
 * @returns Style object with backgroundColor and borderColor
 */
export const getButtonStyle = (variant: string, color?: string): React.CSSProperties => {
  if (color) {
    return {
      backgroundColor: color,
      borderColor: color,
    };
  }
  return {};
};


export const generateUUID = () => {
  return crypto.randomUUID();
}


export function isStaticAsset(pathname: string) {
  return /\.(svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot|otf)$/i.test(pathname);
}