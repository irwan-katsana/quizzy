// Centralized auth utility
export const validateAdminPassword = (password: string): boolean => {
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
  return password === adminPassword && password !== '';
};