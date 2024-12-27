import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(result =>{
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
            }
            console.log(result.user);
            axiosPublic.post('/users', userInfo)
            .then(res=>{
                console.log(res.data);
                navigate('/');
            })
        })
    }


    return (
        <div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn">
                    <FaGoogle></FaGoogle>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;