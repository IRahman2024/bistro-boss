import { NavLink, Outlet } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { FaBook, FaHome, FaShoppingBag, FaUsers } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaRankingStar } from "react-icons/fa6";
import { CiMenuBurger, CiViewList } from "react-icons/ci";
import { MdContactPhone, MdMenuBook } from "react-icons/md";
import useCarts from "../../hooks/useCarts";
import { PiForkKnifeFill } from "react-icons/pi";
import useAdmin from "../../hooks/useAdmin";

const DashBoard = () => {
    const [cart] = useCarts();

    const [isAdmin] = useAdmin();
    // const isAdmin = true;

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-600">
                <ul className="menu text-white">
                    {/*  */}
                    {
                        isAdmin ? <>
                        {/* // admin panel */}
                                <li className="p-2">
                                    <NavLink to='/dashboard/adminHome'>
                                        <FaHome />
                                        Admin Home</NavLink>
                                </li>
                                <li className="p-2">
                                    <NavLink to='/dashboard/addItems'>
                                        <PiForkKnifeFill />
                                        Add Items({cart.length})</NavLink>
                                </li>
                                <li className="p-2">
                                    <NavLink to='/dashboard/manageItems'>
                                        <CiMenuBurger></CiMenuBurger>
                                        Manage Items</NavLink>
                                </li>
                                <li className="p-2">
                                    <NavLink to='/dashboard/bookings'>
                                        <FaBook />
                                        Manage Bookings</NavLink>
                                </li>
                                <li className="p-2">
                                    <NavLink to='/dashboard/users'>
                                        <FaUsers></FaUsers>
                                        All User</NavLink>
                                </li>
                            </> : <>
                            {/* // user */}
                                <li className="p-2">
                                    <NavLink to='/dashboard/userHome'>
                                        <FaHome />
                                        User Home</NavLink>
                                </li>
                                <li className="p-2">
                                    <NavLink to='/dashboard/cart'>
                                        <FiShoppingCart />
                                        My Cart({cart.length})</NavLink>
                                </li>
                                <li className="p-2">
                                    <NavLink to='/dashboard/paymentHistory'>
                                        <SlCalender />
                                        History</NavLink>
                                </li>
                                <li className="p-2">
                                    <NavLink to='/dashboard/review'>
                                        <FaRankingStar />
                                        Add Review</NavLink>
                                </li>
                                <li className="p-2">
                                    <NavLink to='/dashboard/paymentHistory'>
                                        <CiViewList />
                                        Payment History</NavLink>
                                </li>
                                {/* <li className="p-2">
                                    <NavLink to='/dashboard/allUser'>
                                        <FaUsers></FaUsers>
                                        All User</NavLink>
                                </li> */}
                            </>
                    }

                    <li className="divider"></li>

                    {/* common side-bar */}
                    <li className="p-2">
                        <NavLink to='/'>
                            <FaHome />
                            Home</NavLink>
                    </li>
                    <li className="p-2">
                        <NavLink to='/'>
                            <MdMenuBook />
                            Menu</NavLink>
                    </li>
                    <li className="p-2">
                        <NavLink to='/'>
                            <FaShoppingBag></FaShoppingBag>
                            Shop</NavLink>
                    </li>
                    <li className="p-2">
                        <NavLink to='/'>
                            <MdContactPhone></MdContactPhone>
                            Contact</NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;