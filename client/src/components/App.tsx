import {Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import {Toaster} from "react-hot-toast";
import {DevTools} from "jotai-devtools";
import {useAtom} from "jotai";
import Home from "./Home.tsx";
import Orders from "./Orders.tsx";
import NavigationBar from "./NavigationBar.tsx";

const App = () => {



    return (<>

        <Toaster position={"bottom-center"}/>
        <NavigationBar />
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Orders" element={<Orders/>}/>
        </Routes>
        <DevTools/>

    </>)
}
export default App;