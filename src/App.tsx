import AppRoutes from "../routes/AppRoutes";
import { Toaster } from "sonner";

function App() {
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