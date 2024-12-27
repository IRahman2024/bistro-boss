import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Keyboard, Navigation } from 'swiper/modules';

import img1 from '../../../assets/home/slide1.jpg'
import img2 from '../../../assets/home/slide2.jpg'
import img3 from '../../../assets/home/slide3.jpg'
import img4 from '../../../assets/home/slide4.jpg'
import SectionTitle from '../../SectionTitle/SectionTitle';

const Category = () => {
    return (
        <section>
            <SectionTitle
            subHeading={'From 11:00pm To 10:00pm'}
            heading={'ORDER ONLINE'}
            ></SectionTitle>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                keyboard={{
                    enabled: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation, Keyboard]}
                className="mySwiper mb-12"
            >
                <SwiperSlide>
                    <img src={img1} />
                    <p className="text-4xl text-black text-center -mt-24">Salads</p>
                    <div className='mb-24'></div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img2} />
                    <p className="text-4xl text-black text-center -mt-24">Pizza</p>
                    <div className='mb-24'></div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img3} />
                    <p className="text-4xl text-black text-center -mt-24">Soup</p>
                    <div className='mb-24'></div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img4} />
                    <p className="text-4xl text-black text-center -mt-24">Cake</p>
                    <div className='mb-24'></div>
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Category;