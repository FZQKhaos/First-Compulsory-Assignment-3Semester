import { customerAtom } from "../atoms/CustomerAtom.tsx";
import { useAtom } from "jotai";
import { useInitializeData } from "../../InitializeData.ts";

export default function OrdersList() {

    const [customers, setCustomers] = useAtom(customerAtom);

    useInitializeData();

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
                            <option>
                                {customers.map((customer) => {
                                    return <option key={customer.id}>{customer.name}</option>
                                })}
                            </option>
                        </select>
                        <div className="label">
                        </div>
                    </label>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>Customer Id</th>
                        <th>Order Id</th>
                        <th>Order Date</th>
                        <th>Status</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="thOrders">
                        <td>1</td>
                        <td>1</td>
                        <td>2024-24-09</td>
                        <td>Delivered</td>
                        <td>$420</td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </>
    );
}