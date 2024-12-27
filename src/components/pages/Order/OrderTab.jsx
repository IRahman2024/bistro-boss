import FoodCard from "./FoodCard";

const OrderTab = ({items}) => {
    return (
        <div className='grid md:grid-cols-3 gap-y-9 justify-items-center'>
            {
                items?.map((item, idx) => <FoodCard
                    key={idx}
                    item={item}
                ></FoodCard>)
            }
        </div>
    );
};

export default OrderTab;