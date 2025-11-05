/* Fathom Typings */

interface FathomAnalyticsApi {
  beacon: (ctx: { url: string; referrer?: string }) => void;
  blockTrackingForMe: () => void;
  enableTrackingForMe: () => void;
  isTrackingEnabled: () => boolean;
  send: (type: string, data: unknown) => void;
  setSite: (siteId: string) => void;
  sideId: string;
  trackPageview: (ctx?: { url: string; referrer?: string }) => void;
  trackGoal: (goalId: string, cents: number) => void;
  // biome-ignore lint/suspicious/noExplicitAny: Value can be any type
  trackEvent: (eventName: string, value?: { _value: any }) => void;
}

declare global {
  interface Window {
    fathom?: FathomAnalyticsApi;
  }
}

export {};
