export default function OrdersList() {


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
                            // Placeholder for the customer names
                            <option>Tommy Hansen</option>
                            <option>Søren Høberg</option>
                            <option>Lars Larsen</option>
                            <option>Dennis Knudsen</option>
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