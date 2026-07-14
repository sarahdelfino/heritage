export {};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (
      command: 'config' | 'event' | 'js',
      targetIdOrDate: string | Date,
      params?: Record<string, unknown>
    ) => void;
  }
}