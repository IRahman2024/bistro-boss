import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";

const AdminRoutes = ({children}) => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const {user, loader} = useAuth();

    const location = useLocation();
    // console.log(isAdmin, user)
    // console.log(isAdminLoading);

    if(loader || isAdminLoading){
        return <span className="loading loading-spinner w-64"></span>
    }
    
    if (user && isAdmin) {
        return children;
    }

    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default AdminRoutes;