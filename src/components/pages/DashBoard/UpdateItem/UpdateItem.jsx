import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";



const image_host = import.meta.env.VITE_imagebb_api_key;
const image_host_api = `https://api.imgbb.com/1/upload?key=${image_host}`;

const UpdateItem = () => {
    const {name, category, price, details, image, _id} = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    // console.log(item);

    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = { image: data.image[0] };

        //first upload image in imagebb then save the returned url
        const res = await axiosPublic.post(image_host_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            //send menu item form data to database
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                details: data.details,
                image: res.data.data.display_url
            }
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
            console.log(menuRes.data);
            if (menuRes.data.modifiedCount > 0) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.name} was updated`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        // const imageUrl= res.data.data.display_url
        // console.log(imageUrl);
    }

    const {
        register,
        handleSubmit,
    } = useForm()

    return (
        <div>
            <SectionTitle heading='update item' subHeading='update'></SectionTitle>
            <div>
                <div className='mx-10'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* register your input into the hook by invoking the "register" function */}
                        {/* <input {...register("name")} /> */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Recipe Name</span>
                            </div>
                            <input
                                {...register("name", { required: true })}
                                defaultValue={name}
                                type="text" placeholder="Type Dish name" className="input input-bordered w-full" />
                        </label>
                        <div className='flex gap-x-2'>
                            {/* category */}
                            <div className=' w-1/2'>
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Category</span>
                                    </div>
                                    <select
                                        {...register("category", { required: true })}
                                        defaultValue={category}
                                        className="select select-info w-full">
                                        <option disabled selected>Select a category</option>
                                        <option value='salad'>Salad</option>
                                        <option value='pizza'>Pizza</option>
                                        <option value='soup'>Soup</option>
                                        <option value='dessert'>Dessert</option>
                                        <option value='drinks'>Drinks</option>
                                    </select>
                                </label>
                            </div>
                            {/* price */}
                            <div className=' w-1/2'>
                                <label className="form-control">
                                    <div className="label">
                                        <span className="label-text">Price</span>
                                    </div>
                                    <input
                                        {...register("price", { required: true })}
                                        defaultValue={price}
                                        type="text" placeholder="Type Dish name" className="input input-bordered w-full" />
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Recipe Name</span>
                                </div>
                                <textarea
                                    {...register("details", { required: true })}
                                    className="textarea textarea-info" placeholder="details"></textarea>
                            </label>
                        </div>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Add Image</span>
                            </div>
                            <input
                                {...register('image', { required: true })}
                                type="file" className="file-input w-full max-w-xs" />
                        </label>
                        <div className='max-w-1/2 mx-auto mt-4'>
                            <button className="btn btn-info">Update Recipe</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateItem;