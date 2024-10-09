import {useState} from "react";
import {http} from "../../http.ts";
import toast from "react-hot-toast";
import {useAtom} from "jotai";
import {paperAtom} from "../atoms/PaperAtom.tsx";
import {useInitializeData} from "../../InitializeData.ts";


export default function CreatePaper() {

    useInitializeData();

    const [papers, setPapers] = useAtom(paperAtom);

    const [newPaper, setNewPaper] = useState({
        name: "",
        stock: "",
        price: "",
        discontinued: false,
        picture: "/images/PaperStack.jpg"
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewPaper({...newPaper, [name]: value});
    };

    const addProduct = async () => {

        const productData = {
            name: newPaper.name,
            stock: parseInt(newPaper.stock),
            price: parseInt(newPaper.price),
            discontinued: newPaper.discontinued,
            picture: newPaper.picture
        };

            try {
                const response = await http.api.paperCreatePaper(productData);
                setPapers([...papers, response.data]);
                toast.success("Successfully added product to catalog");
            } catch (error) {
                toast.error("Failed to add product to catalog");
            }
    }

    return (
        <div className="card bg-base-300 rounded-box grid h-auto flex-grow place-items-center p-5">
            <h1>Add new Product</h1>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input
                    type="text"
                    name="name"
                    placeholder="Example: A4 - 50 Pack"
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Stock</span>
                </label>
                <input
                    type="text"
                    name="stock"
                    placeholder="Example: 100"
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Price</span>
                </label>
                <input
                    type="text"
                    name="price"
                    placeholder="Example: 250"
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-control w-full max-w-xs mt-4">
                <button className="btn btn-primary w-full" onClick={addProduct}>
                    Add Product
                </button>
            </div>
        </div>
    );
}