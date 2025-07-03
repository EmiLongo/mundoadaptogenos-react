import { MUIThemeProvider } from "./theme/ThemeProvider";
import { router } from "./routes/AppRoutes";
import { Suspense } from "react";
import Loading from "./shared/components/Loading";
import { RouterProvider } from "react-router-dom";

export const App = () => {
  return (
    <MUIThemeProvider>        
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </MUIThemeProvider>
  );
}
