import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";

export default function PopularCard() {
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [imageWidth, setImageWidth] = useState("18rem");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setSlidesPerView(3);
        setImageWidth("18rem");
      } else {
        setSlidesPerView(2);
        setImageWidth("10rem");
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='d-flex justify-content-center'>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={slidesPerView}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiperP d-flex justify-content-center"
      >
        <SwiperSlide>
          <img src="https://firstdraw.blob.core.windows.net/cardimgs/67748760.jpg" style={{ width: imageWidth }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://firstdraw.blob.core.windows.net/cardimgs/67748760.jpg" style={{ width: imageWidth }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://firstdraw.blob.core.windows.net/cardimgs/67748760.jpg" style={{ width: imageWidth }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://firstdraw.blob.core.windows.net/cardimgs/67748760.jpg" style={{ width: imageWidth }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://firstdraw.blob.core.windows.net/cardimgs/67748760.jpg" style={{ width: imageWidth }} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
