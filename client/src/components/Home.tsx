import React, {useEffect} from "react";
import {useAtom} from "jotai";
import PaperItem from "./Order/PaperItem.tsx";
import {useNavigate} from "react-router-dom";

export default function Home() {

    const navigate = useNavigate();

    useEffect(() => {
        
    },[])

    return (
        <div>
            <PaperItem />
        </div>
    );
}