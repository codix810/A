import ProductsByCategory from "../../components/ProductsByCategory";

export default function Men() {
  return (
    <ProductsByCategory
      api="/api/products/men"
      title="MEN COLLECTION"
    />
  );
}