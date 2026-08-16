// 2026, August 15th
// Edison, Justin, Joshua
// the "terms" page is a placeholder for now, but will be where they can find the terms which detail exactly what they have left after they've signed their life away by using this website.
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
