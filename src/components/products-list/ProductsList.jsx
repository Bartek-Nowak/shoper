import "./ProductsList.scss";

function Product({ product }) {
  return (
    <article className="product">
      <img
        className="product__img"
        src={product.thumbnail}
        alt={`${product.title} by ${product.brand}`}
      />
      <div className="product__details">
        <h2>{product.title}</h2>
        <p>by {product.brand}</p>
        <p>{product.description}</p>
        <p>Price: {product.price}$</p>
      </div>
    </article>
  );
}

export default function ProductsList({ products }) {
  return (
    <div className="products_list">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
