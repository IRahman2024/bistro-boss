import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCarts from "../../../hooks/useCarts";

const FoodCard = ({ item }) => {
    const { name, recipe, image, price, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCarts();

    const handleAddToCart = food => {
        if (user && user.email) {
            //todo: send item to database
            console.log(food, user.email);
            const email = user?.email;
            const cartItem = {
                menuId: _id,
                price,
                name,
                image,
                email
            }
            console.log(cartItem);
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${name} has been added`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        //to update cart count
                        refetch();
                    }
                })
        }

        else {
            Swal.fire({
                title: "Login First!",
                text: "Please Login to add to cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    // Swal.fire({
                    //     title: "Deleted!",
                    //     text: "Your file has been deleted.",
                    //     icon: "success"
                    // });
                    navigate('/login', { state: { from: location } });
                }
            });

        }
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img
                className="rounded-t-2xl w-full"
                src={image} alt="Shoes" /></figure>
            <p className="bg-black rounded-xl p-2 text-white absolute  right-2 top-3">$ {price}</p>
            <div className="card-body bg-yellow-100">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button
                        onClick={() => handleAddToCart(item)}
                        className="btn border-0 border-b-4 border-yellow-100">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;