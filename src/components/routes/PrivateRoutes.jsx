import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders/AuthProviders";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }) => {

    const { user, loader } = useContext(AuthContext);
    const location = useLocation();
    
    if(loader){
        return <span className="loading loading-spinner w-64"></span>
    }
    
    if (user) {
        return children;
    }

    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default PrivateRoutes;