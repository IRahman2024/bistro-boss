import { FaRegTrashAlt } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";
import useCarts from "../../../../hooks/useCarts";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
    const [cart, refetch] = useCarts();
    const { loader } = useAuth();
    const axiosSecure = useAxiosSecure();
    if (loader) {
        return <h1 className="text-4xl">please wait</h1>
    }
    // const [{image, name, price}] = cart;
    // console.log(image, name, price);
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    const handleDel = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/carts/${id}`)
                        .then(res => {
                            console.log(res);
                            if (res.data.deletedCount > 0) {
                                refetch();
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                });
                            }
                        })

                }
            });

    }
    return (
        <div>
            <div className="flex gap-x-4 justify-evenly">
                <h2 className="text-4xl">Items Selected: {cart.length}</  h2>
                <h2 className="text-4xl">Total Price: {totalPrice}</  h2>
                <Link
                disabled={!cart.length}
                to='/dashboard/payment' className="btn btn-primary">Pay</Link>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                cart.map((item, idx) => <tr key={idx}>
                                    <td>
                                        {idx + 1}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            {/* <div>
                                            <div className="font-bold">Hart Hagerty</div>
                                            <div className="text-sm opacity-50">United States</div>
                                        </div> */}
                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                        <br />
                                        {/* <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                                    </td>
                                    <td>${item.price}</td>
                                    <th>
                                        <button
                                            onClick={() => handleDel(item._id)}
                                            className="btn btn-outline btn-error btn-xs">
                                            <FaRegTrashAlt />
                                            delete
                                        </button>
                                    </th>
                                </tr>)
                            }
                        </tbody>

                    </table>
                </div>
                {/* table ends */}
            </div>
        </div>
    );
};

export default Cart;