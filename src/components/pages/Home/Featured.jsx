import SectionTitle from "../../SectionTitle/SectionTitle";
import featured from '../../../assets/home/featured.jpg';
import './Feature.css';

const Featured = () => {
    return (
        <div className="featured-item bg-fixed pt-10">
            <SectionTitle
            subHeading={'Check It Out'}
            heading={'Fetured Items'}
            ></SectionTitle>
            <div className="md:flex justify-center items-center py-8 px-16 pb-36 text-white">
                <div>
                    <img src={featured} alt="" />
                </div>
                <div className="md: ml-10">
                    <p>Aug 20, 2023</p>
                    <p className="uppercase">Where canI get Some?</p>
                    <p className="font-bold">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus id veniam ipsum consequatur, quibusdam voluptas consectetur. Quo ratione ex molestiae labore, architecto neque! Atque sed omnis quam vel earum accusantium.</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-2">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;