import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";

import menuImg from '../../../../assets/menu/banner3.jpg'
import dessertImg from "../../../../assets/menu/dessert-bg.jpeg" 
import pizzaImg from "../../../../assets/menu/pizza-bg.jpg"
import saladImg from "../../../../assets/menu/salad-bg.jpg"
import soupImg from "../../../../assets/menu/soup-bg.jpg"
import useMenu from "../../../../hooks/useMenu";
import SectionTitle from "../../../SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
    const [menu] = useMenu();

    const dessert = menu?.filter(item => item.category === 'dessert');
    const pizza = menu?.filter(item => item.category === 'pizza');
    const salad = menu?.filter(item => item.category === 'salad');
    const soup = menu?.filter(item => item.category === 'soup');
    const offered = menu?.filter(item => item.category === 'offered');


    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Our Menu</title>
            </Helmet>
            <Cover
                img={menuImg}
                title={'Our menu'}
                subHeading={'Would You Like To Try Our Dish'}
            ></Cover>
            {/* main cover */}
            <SectionTitle
                subHeading="Don't miss"
                heading="Today's special offer"
            ></SectionTitle>
            {/* offered menu items */}
            <MenuCategory items={offered} coverImg={ menuImg }></MenuCategory>
            {/* dessert menu items */}
            <MenuCategory items={dessert} title="Dessert" coverImg={dessertImg}></MenuCategory>
            {/* pizza menu items */}
            <MenuCategory items={pizza} title="Pizza" coverImg={pizzaImg}></MenuCategory>
            {/* salads menu items */}
            <MenuCategory items={salad} title="Salad" coverImg={saladImg}></MenuCategory>
            {/* dessert menu items */}
            <MenuCategory items={soup} title="Soup" coverImg={soupImg}></MenuCategory>

        </div>
    );
};

export default Menu;