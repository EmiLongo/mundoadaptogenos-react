import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./modules/home/page/HomePage";
import { MUIThemeProvider } from "./theme/ThemeProvider";
import { Suspense } from "react";
import { Layout } from "./shared/Layout/page/Layout";
import ScrollToTop from "./shared/components/ScrollToTop";
import Loading from "./shared/components/Loading";

export const App = () => {
  return (
    <MUIThemeProvider>
      <BrowserRouter>

        <Suspense fallback={<Loading />}>
          <ScrollToTop />
            <Routes>
              {/* Routes with Layout */}
              <Route element={<Layout></Layout>}>
                <Route path="/" element={<HomePage />} />
                {/* <Route path="/melena" element={<MelenaPage />} />
                <Route path="/cordyceps" element={<CordycepsPage />} />
                <Route path="/reishi" element={<ReishiPage />} />
                <Route path="/cola-pavo" element={<ColaPavoPage />} />
                <Route path="/preguntas-frecuentes" element={<FAQPage />} />
                <Route path="/contacto" element={<ContactPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/404" element={<PageNotFound />} /> */}

                {/*Not found or error
                <Route path="*" element={<Navigate to="/404" replace />} /> */}
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </MUIThemeProvider>
  );
}
