import { useEffect } from "react";

export const useModalNavigation = (
  open: boolean,
  onClose: (isBack: boolean) => void
) => {
  useEffect(() => {
    if (open) {
      window.history.pushState(null, "", window.location.pathname);
    }

    const handleBackButton = (event: PopStateEvent) => {
      if (open) {
        event.preventDefault();
        onClose(true);
      }
    };

    window.addEventListener("popstate", handleBackButton);
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [open, onClose]);
};
