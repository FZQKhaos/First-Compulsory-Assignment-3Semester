export default function Orders() {


    return (
        <>
            <div>
                <h1 className="titleOrder">Orders</h1>
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