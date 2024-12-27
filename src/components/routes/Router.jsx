import {
    createBrowserRouter
} from "react-router-dom";
import LayOut from "../Layout/LayOut";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PrivateRoutes from "./PrivateRoutes";
import Secret from "../pages/Shared/Secret/Secret";
import Cart from "../pages/DashBoard/Cart/Cart";
import DashBoard from "../Layout/DashBoard";
import AllUsers from "../pages/DashBoard/AllUsers/AllUsers";
import AddItems from "../pages/DashBoard/AddItems/AddItems";
import AdminRoutes from "./AdminRoutes";
import ManageItems from "../pages/DashBoard/ManageItems/ManageItems";
import UpdateItem from "../pages/DashBoard/UpdateItem/UpdateItem";
import Payment from "../pages/DashBoard/payment/Payment";
import PaymentHistory from "../pages/DashBoard/payment/PaymentHistory";

export const router = createBrowserRouter([
    // user starts
    {
        path: "/",
        element: <LayOut></LayOut>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/menu',
                element: <Menu></Menu>
            },
            {
                path: '/order/:category',
                element: <Order></Order>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            },
            {
                path: '/secret',
                element: <PrivateRoutes><Secret></Secret></PrivateRoutes>
            },

        ]
    },
    //user ends
    //dashboard starts
    {
        path: 'dashboard',
        element: <PrivateRoutes><DashBoard></DashBoard></PrivateRoutes>,
        children:[
            //normal user routes
            {
                path: 'cart',
                element: <Cart></Cart>
            },
            {
                path: 'payment',
                element: <Payment></Payment>
            },
            // admin only routes
            {
                path: 'users',
                element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>
                // element: <AllUsers></AllUsers>
            },
            {
                path: 'addItems',
                element: <AdminRoutes><AddItems></AddItems></AdminRoutes>
            },
            {
                path: 'manageItems',
                element: <AdminRoutes><ManageItems></ManageItems></AdminRoutes>
            },
            {
                path: 'updateItem/:id',
                element: <AdminRoutes><UpdateItem></UpdateItem></AdminRoutes>,
                loader: ({params}) => fetch(`http://localhost:5010/menu/${params.id}`)
            },
            {
                path: 'paymentHistory',
                element:<PaymentHistory></PaymentHistory>
            }
        ]
    }
    //dashboard ends
]);