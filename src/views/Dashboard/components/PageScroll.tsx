import { useEffect } from "react";
import { useLocation } from "react-router";

export function PageScroll() {
  const { pathname } = useLocation();

  // Scroll to the top of the page on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}