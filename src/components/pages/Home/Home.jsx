import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Category from "./Category";
import Featured from "./Featured";
import PopularMenu from "./PopularMenu";
import Testimonial from "./Testimonial";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss</title>
            </Helmet>
            <div className="mb-4">
                <Banner></Banner>
            </div>
            <div className="mx-24">
            <Category></Category>
            </div>
            <PopularMenu></PopularMenu>
            <Featured></Featured>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;