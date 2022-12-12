function Product({ product }) {
  return <p>{product.title}</p>;
}

export default function ProductsList({ products }) {
  return (
    <div>
      {products.map((product) => (
        <Product product={product} />
      ))}
    </div>
  );
}
