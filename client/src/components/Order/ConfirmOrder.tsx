import { useNavigate } from "react-router-dom";
// @ts-ignore
import Name from '../../assests/images/Name.png';
// @ts-ignore
import Address from '../../assests/images/Address.png';
// @ts-ignore
import Phone from '../../assests/images/Phone.png';
// @ts-ignore
import Email from '../../assests/images/Email.png';
import { useEffect, useRef, useState } from "react";
import { http } from "../../http";
import { useAtom } from "jotai";
import { cartAtom } from "../atoms/CartAtom.tsx";

function OrderRequest(amount: number) {
    // Time to order logic :(
}

export default function ConfirmOrder() {
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);
    const [cart] = useAtom(cartAtom);
    const [orderItems, setOrderItems] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const items = cart.map((item) => (
            <PaperItem
                key={item.id}
                name={item.name}
                price={item.price}
                amount={item.amount}
            />
        ));
        setOrderItems(items);
    }, [cart]);

    const handleOrderClick = () => {
        const amount = inputRef.current ? Number(inputRef.current.value) : 0;
        OrderRequest(amount);
        navigate('/ThankYou');
    };

    return (
        <div>
            <h1>Register yourself</h1>
            <label className="input input-bordered flex items-center gap-2 w-1/4">
                <img src={Name} alt={"Name"}/>
                <input type="text" className="grow" placeholder="Name"/>
            </label>
            <label className="input input-bordered flex items-center gap-2 w-1/4">
                <img src={Address} alt={"Address"}/>
                <input type="text" className="grow" placeholder="Address"/>
            </label>
            <label className="input input-bordered flex items-center gap-2 w-1/4">
                <img src={Phone} alt={"Phone"}/>
                <input type="text" className="grow" placeholder="Phone"/>
            </label>
            <label className="input input-bordered flex items-center gap-2 w-1/4">
                <img src={Email} alt="Mail"/>
                <input type="text" className="grow" placeholder="Email"/>
            </label>
            <div>
                {orderItems}
            </div>
            <label className="input input-bordered flex items-center gap-2 w-1/4">
                <p>
                    Total: <strong>${cart.reduce((total, item) => {
                    const price = typeof item.price === 'number' ? item.price : 0;
                    const amount = item.amount;
                    return total + price * amount;
                }, 0).toFixed(2)}</strong>
                </p>
            </label>
            <button onClick={handleOrderClick} className="btn btn-outline">
                Confirm Order
            </button>
        </div>
    );
}

export function PaperItem({name, price, amount }) {
    return (
        <div className="bg-gray-200 p-4 mb-4">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <p>Product: <strong>{name}</strong></p>
            <p>Price: <strong>${price.toFixed(2)}</strong> per unit</p>
            <p>Amount: <strong>{amount}</strong></p>
        </div>
    );
}
