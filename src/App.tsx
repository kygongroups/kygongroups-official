import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SiteFlowProvider } from "./context/SiteFlowContext";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { DivisionsPage } from "./pages/DivisionsPage";
import { ProductsPage } from "./pages/ProductsPage";
import { ContactPage } from "./pages/ContactPage";

export function App() {
  return (
    <BrowserRouter>
      <SiteFlowProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/divisions" element={<DivisionsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </SiteFlowProvider>
    </BrowserRouter>
  );
}

export default App;
