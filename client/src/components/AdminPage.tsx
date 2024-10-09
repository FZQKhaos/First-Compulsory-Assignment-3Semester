import {useNavigate} from "react-router-dom";

export default function AdminPage() {

    const navigate = useNavigate();

    return (
    <div className="flex w-3/4 mx-auto justify-center mt-5">
        <div className="card bg-base-300 rounded-box grid h-20 flex-grow place-items-center" role="button">
            <a onClick={() => navigate('/ProductManager')}>Manage Products</a>
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="card bg-base-300 rounded-box grid h-20 flex-grow place-items-center" role="button">
            <a onClick={() => navigate('/UpdateOrder')}>Update Orders</a>
        </div>
    </div>
);
}