import { customerAtom } from "../atoms/CustomerAtom.tsx";
import { orderAtom } from "../atoms/OrderAtom.tsx";
import { useAtom } from "jotai";
import { useInitializeData } from "../../InitializeData.ts";
import {useState} from "react";

export default function OrdersList() {

    const [customers, setCustomers] = useAtom(customerAtom);
    const [orders, setOrders] = useAtom(orderAtom);
    const [selectedCustomer, setSelectedCustomer] = useState("All Customers");

    useInitializeData();

    const handleCustomerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCustomer(event.target.value);
    };

    const filteredOrders = selectedCustomer === "All Customers"
        ? orders
        : orders.filter(order => order.customerId === Number(selectedCustomer));

    return (
        <>
            <div>
                <h1 className="titleOrder">Orders</h1>
                <div className="selectCustomer">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Select a Customer</span>
                        </div>
                        <select className="select select-bordered" onChange={handleCustomerChange}>
                            <option value="All Customers">All Customers</option>
                                {customers.map((customer) => {
                                    return <option key={customer.id} value={customer.id}>{customer.name}</option>
                                })}
                        </select>
                        <div className="label">
                        </div>
                    </label>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Order Id</th>
                        <th>Order Date</th>
                        <th>Delivery Date</th>
                        <th>Status</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredOrders.map((order) => {
                        //Transforms order date from DB to a more readable text
                        // @ts-ignore
                        const orderDate = new Date(order.orderDate);
                        const orderDateString = orderDate.toLocaleDateString('en-GB');
                        const orderTimeString = orderDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}).replace('.', ':');

                        //Transforms delivery date from DB to a more readable text
                        // @ts-ignore
                        const deliveryDate = new Date(order.deliveryDate);
                        const deliveryDateString = deliveryDate.toLocaleDateString('en-GB');

                        //Finds the customer name for the order
                        const customer = customers.find(customer => customer.id === order.customerId);
                        const customerName = customer ? customer.name : "Unknown Customer";
                        return (
                            <tr key={order.id} className="thOrders">
                                <td>{customerName}</td>
                                <td>{order.id}</td>
                                <td>{orderDateString} {orderTimeString}</td>
                                <td>{deliveryDateString}</td>
                                <td>{order.status}</td>
                                <td>${order.totalAmount}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>

        </>
    );
}