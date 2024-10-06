import React, { useState, useEffect, useRef } from 'react';

const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const length = React.Children.count(children);
  const carouselRef = useRef();

  // Clonamos el primer y el último elemento
  const clonedChildren = [
    React.cloneElement(children[length - 1]),
    ...children,
    React.cloneElement(children[0])
  ];

  useEffect(() => {
    const handleTransitionEnd = () => {
      setIsTransitioning(false);
      if (currentIndex === 0) {
        setCurrentIndex(length);
        carouselRef.current.style.transition = 'none';
        carouselRef.current.style.transform = `translateX(-${length * 100}%)`;
      } else if (currentIndex === length + 1) {
        setCurrentIndex(1);
        carouselRef.current.style.transition = 'none';
        carouselRef.current.style.transform = `translateX(-100%)`;
      }
    };

    const carouselElement = carouselRef.current;
    carouselElement.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      carouselElement.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [currentIndex, length]);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);
      carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
      carouselRef.current.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex - 1);
      carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
      carouselRef.current.style.transform = `translateX(-${(currentIndex - 1) * 100}%)`;
    }
  };

  // Función para deshabilitar deslizamiento táctil
  const handleTouchStart = (e) => {
    e.preventDefault();
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      onTouchStart={handleTouchStart} // Desactiva el inicio de toques
      onTouchMove={handleTouchMove}   // Desactiva el movimiento táctil
    >
      <div
        ref={carouselRef}
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {React.Children.map(clonedChildren, (child, index) => (
          <div key={index} className="min-w-full flex justify-center">
            {child}
          </div>
        ))}
      </div>
      <button
        className="absolute bg-[#748E2F] top-1/2 left-4 transform -translate-y-1/2 rounded-full p-2 w-10 h-10 flex items-center justify-center"
        onClick={prevSlide}
      >
        <span className="text-white text-xl">&lt;</span>
      </button>
      <button
        className="absolute bg-[#748E2F] top-1/2 right-4 transform -translate-y-1/2 rounded-full p-2 w-10 h-10 flex items-center justify-center"
        onClick={nextSlide}
      >
        <span className="text-white text-xl">&gt;</span>
      </button>
    </div>
  );
};

export default Carousel;
