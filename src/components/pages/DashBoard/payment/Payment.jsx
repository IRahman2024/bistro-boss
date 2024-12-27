import { Elements } from '@stripe/react-stripe-js';
import SectionTitle from '../../../SectionTitle/SectionTitle';
import {loadStripe} from '@stripe/stripe-js';
import CheckOutForm from './CheckOutForm';

const Payment = () => {
    const key = import.meta.env.VITE_payment_key;
    const stripePromise = loadStripe(`${key}`);
    return (
        <div>
            <SectionTitle heading='payment' subHeading='payment'></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;