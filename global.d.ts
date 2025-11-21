// Provides a minimal JSX IntrinsicElements declaration to satisfy TypeScript
// when JSX namespace isn't picked up by the React types in some editor setups.
// This file is intentionally small and non-invasive — it only adds a permissive
// fallback for intrinsic elements used in JSX. If preferred, remove this file
// after fixing the underlying type resolution (e.g. ensuring @types/react is
// loaded by the editor/TS server).

export {};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
