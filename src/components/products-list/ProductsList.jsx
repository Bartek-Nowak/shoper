function Product({ product }) {
  return <p>{product.title}</p>;
}

export default function ProductsList({ products }) {
  return (
    <div>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
