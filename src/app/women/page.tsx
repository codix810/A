import ProductsByCategory from "../../components/ProductsByCategory";

export default function Women() {
  return (
    <ProductsByCategory
      api="/api/products/women"
      title="WOMEN COLLECTION"
    />
  );
}