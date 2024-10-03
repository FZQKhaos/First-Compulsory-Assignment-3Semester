import {useNavigate, useLocation} from "react-router-dom";
// @ts-ignore
import Name from '../../assests/images/Name.png';
// @ts-ignore
import Address from '../../assests/images/Address.png';
// @ts-ignore
import Phone from '../../assests/images/Phone.png';
// @ts-ignore
import Email from '../../assests/images/Email.png';
import {useEffect, useRef, useState} from "react";
import React from "react";
import { http } from "../../http"

function OrderRequest(amount: number) {
    
}

export default function ConfirmOrder(){

    const navigate = useNavigate();
    const location = useLocation();
    const { amount, paper } = location.state || { amount: 0}
    
    const inputRef = useRef<HTMLInputElement>(null);
    const [orderAmount, setOrderAmount] = useState<number>(amount);
    
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = amount.toString()
        }
    }, [amount]);
    
    const handleOrderClick = () => {
        const amount = inputRef.current ? Number(inputRef.current.value) : 0
        OrderRequest(amount);
        // Navigate to "Thank you for the order" page here
    };

    return (
        <>
            {/* Product Summary */}
            {paper && (
                <div className="bg-gray-200 p-4 mb-4">
                    <h2 className="text-lg font-semibold">Order Summary</h2>
                    <p>Product: <strong>{paper.name}</strong></p>
                    <p>Price: <strong>${paper.price.toFixed(2)}</strong> per unit</p>
                    <p>Amount: <strong>{orderAmount}</strong></p>
                    <p>Total: <strong>${(paper.price * orderAmount).toFixed(2)}</strong></p>
                </div>
            )}

            <div className="">
                <label className="input input-bordered flex items-center gap-2 w-1/4">
                    <img src={Name} alt={"Name"}/>
                    <input type="text" className="grow" placeholder="Name"/>
                </label>
                <label className="input input-bordered flex items-center gap-2 w-1/4">
                    <img src={Address} alt={"Name"}/>
                    <input type="text" className="grow" placeholder="Address"/>
                </label>
                <label className="input input-bordered flex items-center gap-2 w-1/4">
                    <img src={Phone} alt={"Name"}/>
                    <input type="text" className="grow" placeholder="Phone"/>
                </label>
                <label className="input input-bordered flex items-center gap-2 w-1/4">
                    <img src={Email} alt="Mail"/>
                    <input type="text" className="grow" placeholder="Email"/>
                </label>
                <label className="input input-bordered flex items-center gap-2 w-1/4">
                    <input type="text" className="grow" placeholder="Amount" ref={inputRef}/>
                </label>
                <button onClick={handleOrderClick} className="btn btn-outline">
                    Confirm Order
                </button>
            </div>
        </>
    )
}