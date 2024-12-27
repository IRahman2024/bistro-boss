import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useMenu from "../../../../hooks/useMenu";
import SectionTitle from "../../../SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
    const [menu, refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    // if(loader){
    //     return <h1 className="text-6xl">Please Wait</h1>
    // }

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`)
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: `${item.name} has been deleted.`,
                        icon: "success"
                    });
                }
            }
        })
    }

    return (
        <div>
            <SectionTitle heading='Manage All items' subHeading='hurry up'></SectionTitle>
            <div>

                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead className='bg-amber-500 text-white'>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                menu?.map((item, idx) => <tr key={idx}>
                                    <th>{idx + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>$ {item.price}</td>
                                    <td>
                                        {
                                            item.role === 'admin' ? 'Admin' : <Link
                                            to={`/dashboard/updateItem/${item._id}`}
                                                className="btn btn-success btn-outline btn-sm px-5">
                                                <FaEdit></FaEdit>
                                            </Link>
                                        }
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteItem(item)}
                                            className="btn btn-error btn-outline btn-sm px-5">
                                            <FaTrashAlt></FaTrashAlt>
                                        </button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default ManageItems;