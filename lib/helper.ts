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
