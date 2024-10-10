import { useNavigate } from "react-router-dom";
// @ts-ignore
import Name from '../../assests/images/Name.png';
// @ts-ignore
import Address from '../../assests/images/Address.png';
// @ts-ignore
import Phone from '../../assests/images/Phone.png';
// @ts-ignore
import Email from '../../assests/images/Email.png';
import {useEffect, useRef, useState} from "react";
import { http } from "../../http";
import { useAtom } from "jotai";
import { cartAtom } from "../atoms/CartAtom.tsx";
import { Customer } from "../../Api.ts";

interface Cart {
    id?: number;
    name?: string;
    price?: number;
    amount: number
}

function OrderRequest(cart: Cart[], customer: Customer) {
    const response1 = http.api.customersCreateCustomer({
        name: customer.name,
        address: customer.address,
        phone: customer.phone,
        email: customer.email,
    })
    const response2 = cart.map(p =>  http.api.orderEntriesCreateOrderEntry({
            quantity: p.amount,
            productId: p.id,
        }),
    );
    console.log(response1, response2);
}

export default function ConfirmOrder() {
    const navigate = useNavigate();
    const [cart] = useAtom(cartAtom);
    const [orderItems, setOrderItems] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const items = cart.map((item, index) => (
            <PaperItem
                key={`${item.id}-${index}`}
                name={item.name}
                price={item.price}
                amount={item.amount}
            />
        ));
        setOrderItems(items);
    }, [cart]);

    const handleOrderClick = () => {
        const newCustomer: Customer = {
            name: customerName.current?.value || '',
            address: customerAddress.current?.value || '',
            phone: customerPhone.current?.value || '',
            email: customerEmail.current?.value || '',
        };
        OrderRequest(cart, newCustomer);
        navigate('/ThankYou');
    };

    const customerName = useRef<HTMLInputElement>(null);
    const customerAddress = useRef<HTMLInputElement>(null);
    const customerPhone = useRef<HTMLInputElement>(null);
    const customerEmail = useRef<HTMLInputElement>(null);

    return (
        <div>
            <h1 className="text-lg font-semibold">Basic Information</h1>
            <label className="input input-bordered flex items-center gap-2 w-1/4">
                <img src={Name} alt={"Name"}/>
                <input type="text" name="name" className="grow" placeholder="Name" ref={customerName}/>
            </label>
            <label className="input input-bordered flex items-center gap-2 w-1/4">
                <img src={Address} alt={"Address"}/>
                <input type="text" name="address" className="grow" placeholder="Address" ref={customerAddress}/>
            </label>
            <label className="input input-bordered flex items-center gap-2 w-1/4">
                <img src={Phone} alt={"Phone"}/>
                <input type="text" name="phone" className="grow" placeholder="Phone" ref={customerPhone}/>
            </label>
            <label className="input input-bordered flex items-center gap-2 w-1/4">
                <img src={Email} alt="Mail"/>
                <input type="text" name="email" className="grow" placeholder="Email" ref={customerEmail}/>
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
