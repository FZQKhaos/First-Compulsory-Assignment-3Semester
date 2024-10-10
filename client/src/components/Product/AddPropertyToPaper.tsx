import { paperAtom } from "../atoms/PaperAtom";
import { propertyAtom } from "../atoms/PropertyAtom.tsx";
import { useAtom } from "jotai";
import {useState} from "react";
import toast from "react-hot-toast";
import {http} from "../../http.ts";

export default function AddPropertyToPaper() {

    const [papers, setPapers] = useAtom(paperAtom);
    const [properties] = useAtom(propertyAtom);
    const [selectedPaperId, setSelectedPaperId] = useState<number | null> (null);
    const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);

    const handlePaperChange = (e) => {
        const paperId = parseInt(e.target.value, 10);
        setSelectedPaperId(paperId);
    };

    const handlePropertyChange = (e) => {
        const propertyId = parseInt(e.target.value, 10);
        setSelectedPropertyId(propertyId);
    };

    const addProperty = async () => {
        if (selectedPaperId !== null && selectedPropertyId !== null) {
            const paper = papers.find(paper => paper.id === selectedPaperId);
            // @ts-ignore
            if (paper && paper.properties && !paper.properties.includes(selectedPropertyId)) {
                try {
                    const response = await http.api.paperAddPropertyToPaper(selectedPaperId, { propertyId: selectedPropertyId });
                    // @ts-ignore
                    paper.properties.push(selectedPropertyId);
                    setPapers([...papers]);
                    toast.success(`Successfully added property to paper`);
                } catch (error) {
                    toast.error(`Failed to add property to paper`);
                }
            } else {
                toast.error(`Only one property pr paper allowed`);
            }
        } else {
            toast.error(`Please select both a paper and a property`);
        }
    };


    return (
        <div className="card bg-base-300 rounded-box grid h-auto place-items-center p-5">
            <h1>Add Property to Paper</h1>
            <div>
                <div className="form-control">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Select a Paper</span>
                        </div>
                        <select className="select select-bordered" onChange={handlePaperChange}>
                            {papers.map((paper) => {
                                return (
                                    <option key={paper.id} value={paper.name}>{paper.name}</option>
                                )
                            })}
                            <option disabled selected>Select one</option>
                        </select>
                    </label>
                </div>
                <div className="form-control">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Select a Property</span>
                        </div>
                        <select className="select select-bordered" onChange={handlePropertyChange}>
                            <option disabled selected>Select one</option>
                            {properties.map((property) => {
                                return (
                                    <option key={property.id} value={property.propertyName}>{property.propertyName}</option>
                                )
                            })}
                        </select>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button
                        className="btn btn-primary"
                        onClick={addProperty}
                    >Add Property
                    </button>
                </div>
            </div>
        </div>
    )
}