import { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { sliderData } from "../../productsData.js";
import styles from "../../styles/mainSliders.module.css";

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  let slideLength = sliderData.length;
  const autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  const auto = () => {
    slideInterval = setInterval(nextSlide, intervalTime);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [auto, autoScroll, slideInterval]);

  return (
    <section className={styles.slider}>
      <div className="arrowCon">
        <AiOutlineArrowLeft
          className={`${styles.arrow} ${styles.prev}`}
          onClick={prevSlide}
        />
        <AiOutlineArrowRight
          className={`${styles.arrow} ${styles.next}`}
          onClick={nextSlide}
        />
      </div>
      {sliderData.map((slide, id) => {
        return (
          <div
            className={`slide ${id === currentSlide ? "current" : ""}`}
            key={id}
          >
            {id === currentSlide && (
              <div className={styles.center}>
                <div className={styles.imgSlider}>
                  <Link to={slide.link}>
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      className={styles.sliderImage}
                    />
                  </Link>
                </div>
                <div className={styles.content}>
                  <h2>{slide.title}</h2>
                  <p> {slide.des}</p>
                  <Link to={slide.link}>
                    <button className={styles.sliderBtn}>click</button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ImageSlider;
