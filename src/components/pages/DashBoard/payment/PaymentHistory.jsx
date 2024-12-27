import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    })
    console.log(payments);
    return (
        <div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>Transaction Id</th>
                                <th>Price</th>
                                <th>Payment Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                payments?.map((payment, idx) => <tr key={idx}>
                                    <td>
                                        {idx + 1}
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>
                                        {payment.transactionID}
                                        <br />
                                        {/* <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                                    </td>
                                    <td>${payment.price}</td>
                                    <td>{payment.date}</td>
                                    <td className="text-green-500">{payment.status}...</td>
                                </tr>)
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;