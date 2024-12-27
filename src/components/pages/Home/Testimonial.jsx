import SectionTitle from "../../SectionTitle/SectionTitle";

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";

//ratings
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const Testimonial = () => {
    const [reviews, setReviews] = useState();
    useEffect(() => {
        fetch('http://localhost:5010/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])

    // console.log(reviews);

    return (
        <section>
            <SectionTitle
                subHeading={'-----What Our Client Says----'}
                heading={'testimonials'}
            ></SectionTitle>
            <div className="my-4">
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {
                        reviews?.map((review, idx) => <SwiperSlide
                            key={idx}
                        >
                            <div className="md:m-24 flex flex-col items-center space-y-5">
                                <Rating
                                    style={{ maxWidth: 300 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <img width="100" height="100" src="https://img.icons8.com/ios-filled/100/quote-left.png" alt="quote-left" />
                                <p className="max-w-4xl">{review.details}</p>
                                <h3 className="text-2xl text-orange-400">{review.name}</h3>
                            </div>

                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonial;