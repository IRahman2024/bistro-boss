import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import NavBar from "../pages/Shared/NavBar/NavBar";

const LayOut = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signUp');
    return (
        <div>
            {
                noHeaderFooter ||
                <div className="sticky top-0 z-10 bg-black text-white bg-opacity-40">
                    <NavBar></NavBar>
                </div>
            }
            <Outlet></Outlet>
            {
                noHeaderFooter ||
                <Footer></Footer>
            }
        </div>
    );
};

export default LayOut;