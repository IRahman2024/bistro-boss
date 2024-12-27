import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, coverImg, title }) => {
    return (
        <div className="grid">
            {title && <Cover
                img={coverImg}
                title={title}
                subHeading={'Would You Like To Try Our Dish'}
            ></Cover>}
            <div className="my-7 grid grid-cols-2">
                {
                    items?.map((item, idx) => <MenuItem
                        key={idx}
                        item={item}
                    >
                    </MenuItem>)
                }
            </div>
            <Link
                className="btn btn-outline border-0 border-b-4 mt-2 max-w-64 mx-auto mb-9"
                to={`/order/${title}`}>Order Your Favorite {title}
            </Link>
        </div>
    );
};

export default MenuCategory;