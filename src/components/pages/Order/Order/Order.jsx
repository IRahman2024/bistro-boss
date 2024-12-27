import { useState } from 'react';
import orderCover from '../../../../assets/shop/banner2.jpg'
import Cover from '../../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../../hooks/useMenu';
// import FoodCard from '../FoodCard';
import OrderTab from '../OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Order = () => {
    const categories = ['Salad', 'Pizza', 'Soup', 'Dessert', 'Drinks']
    const {category} = useParams();
    // console.log(category);
    const initialIndex = categories.indexOf(category);
    // console.log(initialIndex);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu] = useMenu();

    const dessert = menu?.filter(item => item.category === 'dessert');
    const pizza = menu?.filter(item => item.category === 'pizza');
    const salad = menu?.filter(item => item.category === 'salad');
    const soup = menu?.filter(item => item.category === 'soup');
    const drink = menu?.filter(item => item.category === 'drinks');

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Orders</title>
            </Helmet>
            <Cover img={orderCover} title="Order Food"></Cover>
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                {/* tablist e gele ki dekhabe oita eikhane show koribe */}
                <TabPanel>
                    {/* <div className='grid md:grid-cols-3 gap-y-9 justify-items-center'>
                        {
                            salad?.map((item, idx) => <FoodCard
                                key={idx}
                                item={item}
                            ></FoodCard>)
                        }
                    </div> */}
                    <OrderTab items={salad}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={pizza}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={soup}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={dessert}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={drink}></OrderTab>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;