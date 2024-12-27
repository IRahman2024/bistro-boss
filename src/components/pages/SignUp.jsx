import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders/AuthProviders";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(data);
                updateUserProfile(data.name, data.photoURL)
                    .then(result => {
                        //create user entry in database
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                        .then(res =>{
                            if(res.data.insertedId){
                                console.log('user was added');
                                console.log('update result: ', result);
                                toast('SignUp Successfull!');
                            }
                        })
                    })
            })
            .catch(err => {
                console.log(err.massage);
                toast.error('something went wrong. Please Try again!');
            })
        console.log(data, errors)
    }

    return (
        <>
            <Helmet>
                <title>Bistro | SignUp</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">SignUp now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name")} name='name' placeholder="Your Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: true })} name='photoURL' placeholder="Your Photo URL" className="input input-bordered" />
                                {
                                    errors.photURL === null && <p className="text-red-500">Photo url needed</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email")} name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"
                                    {...register("password",
                                        {
                                            pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*/,
                                            minLength: 6,
                                            maxLength: 10,
                                        }
                                    )}
                                    name='password'
                                    placeholder="password" className="input input-bordered" />
                                {
                                    errors.password?.type === 'required' &&
                                    <p className="text-red-500">PassWord is required</p>
                                }
                                {
                                    errors.password?.type === 'maxLength' &&
                                    <p className="text-red-500">PassWord must be less then 10 characters</p>
                                }
                                {
                                    errors.password?.type === 'minLength' &&
                                    <p className="text-red-500">PassWord must be more then 6 characters</p>
                                }
                                {
                                    errors.password?.type === 'pattern' &&
                                    <p className="text-red-500">There must be one uppercase one lowercase one number and one specialized character</p>
                                }
                                <label>
                                    <p><small>Already Have An Account? <Link className='hover:text-blue-500' to='/login'>Login here</Link></small></p>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" value="SignUp" className="btn btn-primary" />
                            </div>
                        </form>
                        <ToastContainer
                            autoClose={2000}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;