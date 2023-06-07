import React from 'react'
import carddummysm from "../../assets/images/dummycardsmall.jpg"
import bg1 from "../../assets/images/yugiohBg1.jpg"
import bg2 from "../../assets/images/yugiohBg2.jpg"
import bg3 from "../../assets/images/ehero.jpg"
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { EffectCoverflow, Pagination, Autoplay } from "swiper";
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';


export default function SwiperComponent() {
    const [summary, setSummary] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/cards/summary`);
                setSummary(response.data);
            } catch (error) {
                console.error('Failed to fetch card summary:', error);
            }
        };

        fetchData();
    }, []);

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
                    <figure style={{ position: 'relative', textAlign: 'center' }}>
                        <img
                            src={bg3}
                            className="img-fluid rounded-start mt-1"
                            style={{ borderRadius: "10px" }}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = carddummysm;
                            }}
                        />
                        <figcaption 
                        className='fw-bold fs-5'
                        style={{ position: 'absolute', bottom: '40%', width: '100%', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', padding: '1rem' }}>
                         We have {summary.totalCards || "... "} cards in system!
                        </figcaption>
                    </figure>
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
