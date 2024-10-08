import { paperAtom } from "../atoms/PaperAtom";
import {useInitializeData} from "../../InitializeData.ts";
import {useAtom} from "jotai";
import toast from "react-hot-toast";
import {http} from "../../http.ts";
import {useState} from "react";

export default function ProductStock() {

    useInitializeData();

    const [papers, setPapers] = useAtom(paperAtom);
    const [inputValues, setInputValues] = useState({});

    const handleInputChange = (id, value) => {
        setInputValues({
            ...inputValues,
            [id]: value
        });
    };

    const handleStockChange = async (id, value, name) => {
        const inputValue = parseInt(inputValues[id], 10);
        if (isNaN(inputValue)) {
            toast.error(`Invalid input for ${name}`);
            return;
        }

        const updatedStock = papers.map((paper) =>
            paper.id === id ? { ...paper, stock: paper.stock + inputValue } : paper
        );

        setPapers(updatedStock);

        const updatedPaper = updatedStock.find((paper) => paper.id === id);

        if (!updatedPaper) {
            toast.error(`Failed to restock paper: ${name}`);
            return;
        }

        try {
            await http.api.paperUpdatePaper(id, updatedPaper);
            toast.success(`Restocked paper: ${name}`);
        } catch (error) {
            toast.error(`Failed to restock paper: ${name}`);
        }
    };

    return (
        <div className="card bg-base-300 rounded-box h-auto flex-grow place-items-center p-5">
            <h1>Stock</h1>
            <table className="table thOrders">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Stock</th>
                    <th>Add Stock</th>
                </tr>
                </thead>
                <tbody>
                {papers.map((paper) => {
                    if (paper.discontinued) {
                        return null;
                    }
                    if (paper.id === undefined) {
                        return null;
                    }
                    return (
                    <tr key={paper.id}>
                        <td>{paper.name}</td>
                        <td>{paper.stock}</td>
                        <td>
                            <input
                                type="number"
                                className="input input-bordered inputsize"
                                placeholder="Amount"
                                value={inputValues[paper.id] || ""}
                                onChange={(e) => handleInputChange(paper.id, e.target.value)}
                            />
                        </td>
                        <td>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleStockChange(paper.id, paper.stock, paper.name)}
                            >Add</button>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}