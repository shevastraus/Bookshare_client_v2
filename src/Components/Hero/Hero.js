import "./Hero.scss";

function Hero({ imgHero, altText }) {
  return (
      <img src={imgHero} alt={altText} className="hero" />
  );
}

export default Hero;