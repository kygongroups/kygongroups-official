import { ProductsSection } from "../components/sections/ProductsSection";
import { PageMeta } from "../components/PageMeta";

export function ProductsPage() {
  return (
    <>
      <PageMeta
        title="Our Products | Kygon Groups"
        description="Real Products, Real Impact. Technology products and platforms built by Kygon Groups to solve real-world problems across industries."
      />
      <ProductsSection />
    </>
  );
}
