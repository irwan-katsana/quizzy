// Version management for the application
export const VERSION = 'v0.4.3';

// Helper function to get version with prefix
export const getVersion = () => VERSION;

// Helper function to get version without prefix
export const getVersionNumber = () => VERSION.slice(1);