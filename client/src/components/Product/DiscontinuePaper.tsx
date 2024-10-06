import { paperAtom } from "../atoms/PaperAtom.tsx";
import { useAtom } from "jotai";
import {useInitializeData} from "../../InitializeData.ts";

export default function DiscontinuePaper (){

    const [papers, setPapers] = useAtom(paperAtom);

    useInitializeData();


    return (
            <div className="card bg-base-300 rounded-box h-auto flex-grow place-items-center p-5">
                <h1>Discontinue Product(s)</h1>
                <table>
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
                                    <input type="radio" name="radio-1" className="radio" defaultChecked/>
                                    <input type="radio" name="radio-1" className="radio"/>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
    );
}
