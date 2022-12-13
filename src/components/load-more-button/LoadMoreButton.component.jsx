import Loading from "../loading/Loading.component";
import EndProduct from "../end-product/EndProducts.component";

export default function LoadMoreButton({ loading, end, handleOnClick }) {
  if (loading) {
    return <Loading />;
  } else if (end) {
    return <EndProduct />;
  } else {
    return (
      <button className="btn" onClick={handleOnClick}>
        <span>Load more</span>
      </button>
    );
  }
}
