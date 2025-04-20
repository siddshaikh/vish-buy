import ProductDetail from "@/components/ProductDetail";
import React from "react";

const Detail = async ({ params }) => {
  const { id } = params;
  const productRes = await fetch(`https://dummyjson.com/products/${id}`);
  const product = await productRes.json();
  const relatedRes = await fetch(
    `https://dummyjson.com/products/category/${product.category}`
  );
  const relatedProductsData = await relatedRes.json();
  const relatedProducts = relatedProductsData.products.filter(
    (p) => p.id !== product.id
  );

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
};

export default Detail;
