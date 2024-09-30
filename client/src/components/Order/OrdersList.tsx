import { customerAtom } from "../atoms/CustomerAtom.tsx";
import { orderAtom } from "../atoms/OrderAtom.tsx";
import { useAtom } from "jotai";
import { useInitializeData } from "../../InitializeData.ts";

export default function OrdersList() {

    const [customers, setCustomers] = useAtom(customerAtom);
    const [orders, setOrders] = useAtom(orderAtom);

    useInitializeData();

    console.log("Orders: " + orders);

    return (
        <>
            <div>
                <h1 className="titleOrder">Orders</h1>
                <div className="selectCustomer">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Select a Customer</span>
                        </div>
                        <select className="select select-bordered">
                            <option>All Customers</option>
                                {customers.map((customer) => {
                                    return <option key={customer.id}>{customer.name}</option>
                                })}
                        </select>
                        <div className="label">
                        </div>
                    </label>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Order Date</th>
                        <th>Delivery Date</th>
                        <th>Status</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => {
                        // @ts-ignore
                        const orderDate = new Date(order.orderDate);
                        const orderDateString = orderDate.toLocaleDateString('en-GB');
                        const orderTimeString = orderDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}).replace('.', ':');
                        return (
                            <tr key={order.id} className="thOrders">
                                <td>{order.id}</td>
                                <td>{orderDateString} {orderTimeString}</td>
                                <td>{order.deliveryDate}</td>
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