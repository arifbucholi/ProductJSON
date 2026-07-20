import AppRoutes from "../routes/AppRoutes";
import { Toaster } from "sonner";

import { useEffect } from "react";
import { useCartStore } from "./store/useCartStore";
import { useFavoriteStore } from "./store/useFavoriteStore";

function App() {
  useEffect(() => {
    const syncStorage = () => {
      useCartStore.persist.rehydrate();
      useFavoriteStore.persist.rehydrate();
    };

    window.addEventListener("focus", syncStorage);
    window.addEventListener("storage", syncStorage);

    return () => {
      window.removeEventListener("focus", syncStorage);
      window.removeEventListener("storage", syncStorage);
    };
  }, []);
  return (
    <>
      <AppRoutes />

      <Toaster
        position="top-center"
        theme="light"
        richColors
        closeButton
        expand
        duration={3000}
      />
    </>
  );
}

export default App;
