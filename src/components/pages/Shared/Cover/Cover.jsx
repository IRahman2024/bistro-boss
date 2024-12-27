import { Parallax } from 'react-parallax';

const Cover = ({ img, title, subHeading }) => {
    return (
        <Parallax
            blur={{ min: -80, max: 80 }}
            //set bg image for parallax
            bgImage={img}
            bgImageAlt="the dog"
            strength={-200}
        >
            <div className="hero h-[600px]">
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-7xl font-bold uppercase">{title}</h1>
                        <p className="mb-5">{subHeading}</p>
                    </div>
                </div>
            </div>

        </Parallax>
    );
};

export default Cover;