import { useEffect, useState, useRef } from "react";
import {http} from "../http.ts";

function OrderRequest(amount: number) {
    const response = http.orders.ordersCreate({
        order_date: Date.now().toString(),
        delivery_date: "",
        status: "pending",
        total_amount: amount,
        customer_id: 1,
    });
    console.log(response);
}

export default function PaperItem() {
    const [items, setItems] = useState<number[]>([]);

    function makeItems() {
        const newItems = Array.from({ length: 5 }, (_, i) => i);
        setItems(newItems);
    }

    useEffect(() => {
        makeItems();
    }, []);

    return (
        <div className="flex overflow-x-auto space-x-4 p-4">
            {items.map((_, index) => (
                <div key={index} className="flex-none w-60">
                    <Item />
                </div>
            ))}
        </div>
    );
}

export function Item() {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOrderClick = () => {
        const amount = inputRef.current ? Number(inputRef.current.value) : 0
        OrderRequest(amount);
    };

    return (
        <div className="p-4 bg-gray-100 rounded-md">
            <img
                src="https://www.gstatic.com/webp/gallery/1.webp"
                className="rounded-box"
                alt="Carousel Item"
            />
            <div>
                <input
                    type="number"
                    placeholder="Amount"
                    className="input w-3/4 max-w-xs"
                    ref={inputRef} // Attach the ref to the input field
                />
                <button onClick={handleOrderClick} className="btn btn-neutral">
                    Order
                </button>
            </div>
        </div>
    );
}
