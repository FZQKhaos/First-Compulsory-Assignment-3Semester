import { useEffect, useState, useRef } from "react";
import { http } from "../../http.ts";
import { Paper } from "../../Api";
import { useAtom } from "jotai";
import { cartAtom } from "../atoms/CartAtom.tsx";
// @ts-ignore
import PaperPlaceholder from '../../assests/images/PaperStack.jpg';

export default function PaperItem() {
    const [papers, setPapers] = useState<Paper[]>([]);
    const [cart, setCart] = useAtom(cartAtom);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc"); // State for sorting order

    useEffect(() => {
        const fetchPapers = async () => {
            const response = await http.api.paperGetPapers();
            setPapers(response.data);
        };
        fetchPapers();
    }, []);

    const handleAddToCart = (paper: Paper, amount: number) => {
        if (amount > 0) {
            setCart(prevCart => [
                ...prevCart,
                { id: paper.id, name: paper.name, price: paper.price, amount }
            ]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(e.target.value);
    };

    const filteredPapers = papers.filter(paper =>
        search === "" || paper.name?.toLowerCase().includes(search.toLowerCase())
    );

    const sortedPapers = [...filteredPapers].sort((a, b) => {
        if (sortOrder === "asc") {
            return (a.price || 0) - (b.price || 0);
        } else {
            return (b.price || 0) - (a.price || 0);
        }
    });

    return (
        <div className="flex flex-col p-4">
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    placeholder="Search papers..."
                    value={search}
                    onChange={handleChange}
                    className="input mr-2"
                />
                <select value={sortOrder} onChange={handleSortChange} className="select">
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select>
            </div>
            <div className="flex overflow-x-auto space-x-4">
                {sortedPapers.map(paper => (
                    <div key={paper.id} className="flex-none w-60">
                        <Item paper={paper} onAddToCart={handleAddToCart} />
                    </div>
                ))}
            </div>
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
                src={PaperPlaceholder}
                className="rounded-box"
                alt="Paper Item"
            />
            <h3>{paper.name}</h3>
            <p>${paper.price?.toFixed(2) || "0.00"}</p>
            <div>
                <input
                    type="number"
                    placeholder="Amount"
                    className="input w-3/4 max-w-xs"
                    ref={inputRef}
                />
                <button onClick={handleOrderClick} className="btn btn-neutral">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
