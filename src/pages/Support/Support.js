import "./Support.scss";
import { Link } from "react-router-dom";
import Hero from "../../Components/Hero/Hero";
import supportHero from "../../assets/images/borrow_book_image.png";

function Support() {
  return (
    <main>
      <Hero imgHero={supportHero} altText="support" />
      <div className="support">
        <p className="support__text">
          This web application was developed by Sheva Straus. For more
          information or further support, email her at &nbsp;
          <Link to="mailto:shevis@gmail.com" className="support__email-link">
            shevis@gmail.com.
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Support;
