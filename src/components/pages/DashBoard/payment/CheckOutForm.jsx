import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useCarts from "../../../../hooks/useCarts";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const CheckOutForm = () => {
    const stripe = useStripe();
    const { user } = useAuth();
    const elements = useElements();
    const [error, setError] = useState();
    const [transactionID, setTransactionID] = useState();
    const [clientSecret, setClientSecret] = useState();
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCarts();
    const price = cart.reduce((total, item) => total + item.price, 0);

    // console.log(user);

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, price])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod);
            setError(null);
        }

        //confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error: ', confirmError);
        }
        else {
            console.log('payment intent: ', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                setTransactionID(paymentIntent.id)
                //now save the payment in the database
                const payment = {
                    email: user?.email,
                    price: price,
                    transactionID: paymentIntent.id,
                    date: new Date(), //utc date convert use moment js
                    cartIds: cart.map(item => item._id),
                    menuIds: cart.map(item => item.menuId),
                    status: 'pending'
                }
                const res = await axiosSecure.post('/payments', payment);
                console.log('payment saved', res.data);
                refetch();
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        title: "Transaction Successful",
                        text: `Thank You for buying from us.
                        Transaction id: ${paymentIntent.id}`,
                        icon: "success"
                    });
                }

            }
        }

    }


    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            {
                error ? <p className="text-2xl font-bold text-red-600">Error: {error}</p> :
                    ' '
            }
            <button className="btn btn-outline btn-success px-7 mt-2" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            {transactionID && <p className="text-green-500 text-2xl font-bold">transaction id: ${transactionID}</p>}
        </form>
    );
};

export default CheckOutForm;