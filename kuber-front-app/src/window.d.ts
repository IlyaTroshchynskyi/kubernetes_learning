// src/window.d.ts

// Adding this export makes the file a module, which is required for augmenting global types.
export {};

declare global {
  // This extends the existing 'Window' interface from the browser's DOM library.
  interface Window {
    // We declare our custom property here.
    // The '?' makes it optional, preventing errors if the script hasn't run yet.
    runtimeConfig?: {
      VITE_DESCRIPTION: string;
      VITE_BASE_URL: string;
      VITE_ENV: string;
      // You can add any other runtime variables here in the future
    };
  }
}