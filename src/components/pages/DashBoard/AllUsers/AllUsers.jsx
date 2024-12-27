import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleDeleteUser = user => {
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
                    axiosSecure.delete(`/users/${user._id}`)
                        .then(res => {
                            console.log(res);
                            refetch();
                            if (res.data.deletedCount > 0) {
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
    const handleMakeAdmin = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.patch(`/users/admin/${user._id}`)
                        .then(res => {
                            console.log(res);
                            if (res.data.modifiedCount > 0) {
                                refetch();
                                Swal.fire({
                                    title: "Success!",
                                    text: `${user.name} is a new admin.`,
                                    icon: "success",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        })

                }
            });
    }

    return (
        <div>
            <div className='flex justify-evenly my-4'>
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>
            </div>
            <div>

                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead className='bg-amber-500 text-white'>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Roll</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                users.map((user, idx) => <tr key={idx}>
                                    <th>{idx + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {
                                            user.role === 'admin' ? 'Admin' : <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="btn btn-success btn-outline btn-xs px-5">
                                                <FaUsers></FaUsers>
                                            </button>
                                        }
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteUser(user)}
                                            className="btn btn-error btn-outline btn-xs px-5">
                                            <FaTrashAlt></FaTrashAlt>
                                        </button>
                                    </td>
                                </tr>)
                            }
                            {/* <tr>
                                <th>{users.length + 1}</th>
                                <td>Cy Ganderton</td>
                                <td>Quality Control Specialist</td>
                                <td>Blue</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default AllUsers;