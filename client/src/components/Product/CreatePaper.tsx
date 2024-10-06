import {useState} from "react";

export default function CreatePaper() {

    const [newPaper, setNewPaper] = useState({
        name: "",
        stock: "",
        price: "",
        discontinued: false,
        picture: ""
    });

    return (
        <div className="card bg-base-300 rounded-box grid h-auto flex-grow place-items-center p-5">
            <h1>Add new Product</h1>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Name</span>
                </div>
                <input type="text" placeholder="Example: A4 - 50 Pack"
                       className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Stock</span>
                </div>
                <input type="text" placeholder="Example: 100" className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Price</span>
                </div>
                <input type="text" placeholder="Example: 250" className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs">
            </label>
            <label>
                <div className="label">
                    <span className="label-text">Picture</span>
                </div>
                <input type="file" className="file-input file-input-bordered w-full max-w-xs"/>
            </label>
            <button className="btn btn-primary mt-2">Add Product</button>
        </div>
    );
}