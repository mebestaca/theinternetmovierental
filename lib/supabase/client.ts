// 2026, August 15th
// Edison, Justin, Joshua
// this client.ts file creates a supabase client for using in our client side components. The '!' tells typescript that these values are not null and are not optional.
//
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
