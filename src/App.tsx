// src/App.tsx
import { MUIThemeProvider } from "./theme/ThemeProvider";
import { router } from "./routes/AppRoutes";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { useUserStore } from "@store/useUserStore";
import { AuthProvider } from "@shared/hooks/AuthProvider";
import Loading from "@shared/components/Loading";

export const App = () => {
  const { hasHydrated } = useUserStore();

  // Mostrar loading hasta que el store se haya hidratado
  if (!hasHydrated) {
    return <Loading />;
  }

  return (
    <MUIThemeProvider>
      <AuthProvider>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </AuthProvider>
    </MUIThemeProvider>
  );
}
