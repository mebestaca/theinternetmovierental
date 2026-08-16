// 2026, August 15th
// Edison, Justin, Joshua
// the "About" page is a placeholder for now, but will eventually contain information about the app and how the company got started.
//
import ComingSoon from "../components/ComingSoon";

export default function WatchlistPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#06111D]">
      <ComingSoon
        eyebrow="Now in production"
        description="Personal watchlists are on the way — track what to watch next, all in one place."
        backHref="/"
      />
    </div>
  );
}
