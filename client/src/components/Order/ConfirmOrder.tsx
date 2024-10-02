import {useNavigate} from "react-router-dom";
// @ts-ignore
import Name from '../../assests/images/Name.png';
// @ts-ignore
import Address from '../../assests/images/Address.png';
// @ts-ignore
import Phone from '../../assests/images/Phone.png';
// @ts-ignore
import Email from '../../assests/images/Email.png';

export default function ConfirmOrder(){

    const navigate = useNavigate();

    return (
        <>
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
            <button className="btn btn-outline">
                Confirm Order
            </button>
            </div>
        </>
    )
}