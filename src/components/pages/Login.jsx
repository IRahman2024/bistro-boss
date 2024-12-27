import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProviders/AuthProviders';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify'
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const captchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);

    const { signIn } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const pass = form.password.value;
        signIn(email, pass)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast('login successful!')
                navigate(from, { replace: true })
            })
            .catch(err => {
                toast.error('something went wrong. Please Try again!');
                console.log(err.message);

            })
    }
    const handleValidateCaptcha = () => {
        const value = captchaRef.current.value;
        if (validateCaptcha(value) == true) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    }

    useEffect(() => {
        //koto character er capchat chai oita dite hbe 
        loadCaptchaEnginge(6);
    }, [])

    return (
        <>
            <Helmet>
                <title>Bistro | LogIn</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0 md:w-1/2 max-w-xs shadow-2xl bg-base-100">
                        <form
                            onSubmit={handleLogin}
                            className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            {/* captcha */}
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input
                                    onBlur={handleValidateCaptcha}
                                    type="text" placeholder="type the captcha" ref={captchaRef} className="input input-bordered" required />
                                {/* <button onClick={handleValidateCaptcha} className="btn btn-xs mt-4">Validate</button> */}
                            </div>
                            <p><small>New here <Link className='hover:text-blue-500' to='/signUp'>SignUp here</Link></small></p>
                            <SocialLogin></SocialLogin>
                            <div className="form-control mt-6">
                                <button disabled={disabled} className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;