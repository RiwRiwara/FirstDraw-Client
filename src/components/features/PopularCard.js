import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom"
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";
import axios from 'axios';
import { Badge } from '@mui/material';

export default function PopularCard() {
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [imageWidth, setImageWidth] = useState("18rem");
  const navigate = useNavigate()
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

  const [topCard, setTopCard] = useState([])
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/toppickedcards`).then((res) => {
      setTopCard(res.data)
    }).catch((err) => {
      console.log(err)
    })
  })
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
        className="mySwiperP d-flex justify-content-center box">
        {topCard && (
          <>
            {topCard.map((card) => (

              <SwiperSlide>
                <div style={{ marginTop: "2rem", marginBottom: "2rem", position: "relative" }}>
                  <img
                    src={`${process.env.REACT_APP_CARD_IMG_API}/${card.id}.jpg`}
                    className='zoom1'
                    style={{ width: imageWidth }}
                    onClick={() => { navigate("/cards/" + card._id) }}
                  />
                  <div 
                  style={{ position: "absolute", top: "0", left: "0", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "0.6rem", color: "#fff", borderRadius: "4px 0 0 0" }}
                  className='fw-bold'>
                    Pick : {card.pick || 0}
                  </div>
                </div>
              </SwiperSlide>

            ))}

          </>
        )}
      </Swiper>
    </div>
  );
}
