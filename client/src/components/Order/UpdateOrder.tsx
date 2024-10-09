import { customerAtom } from "../atoms/CustomerAtom.tsx";
import { orderAtom } from "../atoms/OrderAtom.tsx";
import { useAtom } from "jotai";
import { useInitializeData } from "../../InitializeData.ts";
import {useState} from "react";

export default function UpdateOrder() {

    useInitializeData();

    const [customers, setCustomers] = useAtom(customerAtom);
    const [orders, setOrders] = useAtom(orderAtom);
    const [orderStatus, setOrderStatus] = useState<{ [key: number]: string }>({});

    const handleStatusChange = (orderId: number, newStatus: string) => {
        setOrderStatus(prevStatuses => ({
            ...prevStatuses,
            [orderId]: newStatus
        }));
    };

        return (
            <div>
                <div>
                    <h1 className="titleOrder">Update Orders</h1>
                    <table>
                        <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Order Id</th>
                            <th>Order Date</th>
                            <th>Delivery Date</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) => {
                            //Transforms order date from DB to a more readable text
                            // @ts-ignore
                            const orderDate = new Date(order.orderDate);
                            const orderDateString = orderDate.toLocaleDateString('en-GB');
                            const orderTimeString = orderDate.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            }).replace('.', ':');

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
                                    <td>
                                        <select
                                            value={orderStatus[order.id as number] || order.status}
                                            onChange={(e) => handleStatusChange(order.id as number, e.target.value)}
                                        >
                                            <option value="Processing order">Processing order</option>
                                            <option value="Shipping">Shipping</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </td>
                                    <td>${order.totalAmount}</td>
                                    <td>
                                        <button className="btn p-3 mt-2 mb-2">
                                            Save
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
}