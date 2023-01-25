import "./Loading.scss";
import loading from "../../assets/images/animated_book.gif";

function Loading() {

  return (
    <main className="loading">
      <img src={loading} alt="loading" className="loading" />
    </main>
  );
}

export default Loading;

