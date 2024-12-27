// import { useEffect, useState } from "react";
import SectionTitle from "../../SectionTitle/SectionTitle";
import MenuItem from "../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {
    const [menu] = useMenu();
    //keeps only the popular items from entire menu 
    const popular = menu?.filter(item => item.category === 'popular')

    // const [menu, setMenu] = useState();
    // useEffect(() => {
    //     fetch('menu.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             const popularItems = data.filter(item => item.category === 'popular')
    //             setMenu(popularItems)
    //         })
    // }, [])

    // console.log(menu);

    return (
        <section className="grid place-items-center my-6">
            <SectionTitle
                heading={'From Our Menu'}
                subHeading={'Popular Items'}
            ></SectionTitle>
            <div className="mb-7 grid grid-cols-2">
                {
                    popular?.map((item, idx) => <MenuItem
                        key={idx}
                        item={item}
                    >
                    </MenuItem>)
                }
            </div>
            <div>
                <button className="btn btn-outline border-0 border-b-4 mt-2">View Full Menu</button>
            </div>
        </section>

    );
};

export default PopularMenu;