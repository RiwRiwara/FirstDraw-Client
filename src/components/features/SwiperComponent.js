import React from 'react'
import carddummysm from "../../assets/images/dummycardsmall.jpg"
import bg1 from "../../assets/images/yugiohBg1.jpg"
import bg2 from "../../assets/images/yugiohBg2.jpg"
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination , Autoplay} from "swiper";


export default function SwiperComponent() {
    return (
        <>
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper "
            >
                <SwiperSlide>
                    <img
                        src={bg1}
                        className="img-fluid rounded-start mt-1"
                        style={{ borderRadius: "10px" }}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = carddummysm;
                        }}
                    />

                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={bg2}
                        className="img-fluid rounded-start mt-1"
                        style={{ borderRadius: "10px" }}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = carddummysm;
                        }}
                    />
                </SwiperSlide>
            </Swiper >
        </>
    )
}
