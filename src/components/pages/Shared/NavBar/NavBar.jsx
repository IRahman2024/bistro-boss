import { useContext } from "react";
import { Link } from "react-router-dom"
import { AuthContext } from "../../../../providers/AuthProviders/AuthProviders";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiShoppingCart } from "react-icons/fi";
import useCarts from "../../../../hooks/useCarts";


const NavBar = () => {

    const { logOut, user } = useContext(AuthContext);
    const [cart] = useCarts();

    const navlinks = <>
        <li className="mx-2"><Link to='/'>Home</Link></li>
        <li className="mx-2"><Link to='/menu'>Our Menu</Link></li>
        <li className="mx-2"><Link to='/order/Salad'>Order</Link></li>
        <li className="mx-2">
            <Link to='/dashboard/cart'>
                <button className="btn btn-sm">
                    <FiShoppingCart />
                    <div className="mx-2 badge badge-secondary">+{cart.length}</div>
                </button>
            </Link>
        </li>
    </>
    // console.log(user?.photoURL);

    const handleLogOut = () => {
        // console.log('dgdgddgf');
        return logOut()
            .then((result) => {
                console.log(result);
                toast('Logout Successful!');
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="navbar">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navlinks}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Foodis</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navlinks}
                </ul>
            </div>
            <div className="navbar-end">

                {
                    user ?
                        <>
                            <div role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="mr-2 w-36 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                                </div>
                            </div>
                            <button
                                onClick={handleLogOut}
                                className="btn btn-outline btn-error">LogOut
                            </button>
                        </>
                        :
                        <Link to='/login'>
                            <a className="btn btn-outline btn-success">Login</a>
                        </Link>
                }
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
            />
        </div>
    );
};

export default NavBar;