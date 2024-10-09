import { propertyAtom} from "../atoms/PropertyAtom.tsx";
import {useAtom} from "jotai";
import toast from "react-hot-toast";
import {http} from "../../http.ts";
import {useState} from "react";


export default function CreateProperty(){

    const [properties, setProperties] = useAtom(propertyAtom);
    const [property, setProperty] = useState({
        name: ""
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProperty({...property, [name]: value});
    }

    const addProperty = async () => {

        const propertyData = {
            name: property.name
        };

        try {
            const response = await http.api.propertyCreateProperty(propertyData);
            setProperties([...properties, response.data]);
            toast.success(`Successfully created property ${property.name}`);
        } catch (error) {
            toast.error(`Failed to add property ${property.name}`);
        }
    }

    return (
        <div className="card bg-base-300 rounded-box h-auto mx-2 place-items-center p-5">
            <div className="card-body">
                <h1>Create Property</h1>
                <div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Property Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Ex: Water Resistant"
                            className="input input-bordered"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-control mt-6">
                        <button
                            className="btn btn-primary"
                            onClick={addProperty}
                        >Create Property</button>
                    </div>
                </div>
            </div>
        </div>
    )
}