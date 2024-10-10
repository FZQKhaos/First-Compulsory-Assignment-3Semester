import { paperAtom } from "../atoms/PaperAtom.tsx";
import { useAtom } from "jotai";
import {useInitializeData} from "../../InitializeData.ts";
import {http} from "../../http.ts";
import toast from "react-hot-toast";

export default function DiscontinuePaper (){

    const [papers, setPapers] = useAtom(paperAtom);

    useInitializeData();

    const handleDiscontinueChange = async (id, value, name) => {
        const updatedPapers = papers.map((paper) =>
                paper.id === id ? { ...paper, discontinued: value } : paper
            );

        setPapers(updatedPapers);

        const updatedPaper = updatedPapers.find(paper => paper.id === id);

        if (!updatedPaper) {
            toast.error(`Failed to find updated paper: ${name}`);
            return;
        }

        try {
            const response = await http.api.paperUpdatePaper(id, updatedPaper);
            toast.success(`Updated product: ${name}`);
        } catch (error) {
            toast.error(`Failed to update product: ${name}`);
        }
    }


    return (
            <div className="card bg-base-300 rounded-box h-auto flex-grow place-items-center p-5">
                <h1>Discontinue Product(s)</h1>
                <table className="table thOrders">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Discontinue</th>
                    </tr>
                    </thead>
                    <tbody>
                    {papers.map((paper) => {
                        return (
                            <tr key={paper.id}>
                                <td>{paper.name}</td>
                                <td>{paper.stock}</td>
                                <td>{paper.price}</td>
                                <td>
                                    <input
                                        type="radio"
                                        name={`paperId-${paper.id}`}
                                        className="radio"
                                        checked={paper.discontinued === true}
                                        onChange={(e) => handleDiscontinueChange(paper.id, true, paper.name)}
                                    /> Yes
                                    <input
                                        type="radio"
                                        name={`paperId-${paper.id}`}
                                        className="radio ml-3"
                                        checked={paper.discontinued === false}
                                        onChange={(e) => handleDiscontinueChange(paper.id, false, paper.name)}
                                    /> No
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
    );
}
