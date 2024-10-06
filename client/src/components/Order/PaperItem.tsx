import { useEffect, useState, useRef } from "react";
import {http} from "../../http.ts";
import {useNavigate} from "react-router-dom";
import { paperAtom } from "../atoms/PaperAtom"
import { Paper } from "../../Api"
import {useAtom} from "jotai";
import {cartAtom} from "../atoms/CartAtom.tsx";

export default function PaperItem() {
    const [papers, setPapers] = useState<Paper[]>([]);
    const [cart, setCart] = useAtom(cartAtom);

    useEffect(() => {
        http.api.papersGetPapers()
            .then(response => setPapers(response.data));
    }, []);

    const handleAddToCart = (paper: Paper, amount: number) => {
        if (amount > 0) {
            setCart(prevCart => [
                ...prevCart,
                { id: paper.id, name: paper.name, price: paper.price, amount }
            ]);
        }
    };

    return (
        <div className="flex overflow-x-auto space-x-4 p-4">
            {papers.map((paper) => (
                <div key={paper.id} className="flex-none w-60">
                    <Item paper={paper} onAddToCart={handleAddToCart} />
                </div>
            ))}
        </div>
    );
}

interface ItemProps {
    paper: Paper;
    onAddToCart: (paper: Paper, amount: number) => void;
}

export function Item({ paper, onAddToCart }: ItemProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOrderClick = () => {
        const amount = inputRef.current ? Number(inputRef.current.value) : 0;
        onAddToCart(paper, amount);
    };

    return (
        <div className="p-4 bg-gray-100 rounded-md">
            <img
                src="https://www.gstatic.com/webp/gallery/1.webp" className="rounded-box" alt="Carousel Item"
            />
            <h3>{paper.name}</h3>
            <p>${paper.price?.toFixed(2) || "0.00"}</p>
            <div>
                <input
                    type="number" placeholder="Amount" className="input w-3/4 max-w-xs" ref={inputRef}
                />
                <button onClick={handleOrderClick} className="btn btn-neutral">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
