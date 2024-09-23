import React, {useEffect} from "react";
import {useAtom} from "jotai";
import {PatientsAtom} from "../atoms/PatientsAtom.tsx";
import {useInitializeData} from "../useInitializeData.ts";

export default function Home() {

    const [, setProducts] = useAtom(PatientsAtom);

    useEffect(() => {
        
    },[])
    
    useInitializeData();

    return (
        <div>
            <h1 className="menu-title text-5xl m-5">Welcome to Dunder Mifflin Infinity</h1>
            <h2 className="menu-title text-3xl m-5">Paper Shop</h2>

            
        </div>
    );
}