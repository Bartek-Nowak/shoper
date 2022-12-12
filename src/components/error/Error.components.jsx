import "./Error.scss";

export default function Error({ error }) {
  return (
    <div className="error_pop">
      <h1>Error!</h1>
      <p>Shark chewing internet cable 🦈</p>
      <p>Details: {error}</p>
    </div>
  );
}
