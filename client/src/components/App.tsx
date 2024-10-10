import {Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import {Toaster} from "react-hot-toast";
import {DevTools} from "jotai-devtools";
import {useAtom} from "jotai";
import Home from "./Home.tsx";
import Orders from "./Order/OrdersList.tsx";
import NavigationBar from "./NavigationBar.tsx";
import Customer from "./Order/ConfirmOrder.tsx";
import ThankYou from "./Order/ThankYou.tsx";

const App = () => {


    return (<>

        <Toaster position={"bottom-center"}/>
        <NavigationBar />
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Orders" element={<Orders/>}/>
            <Route path="/Customer" element={<Customer/>}/>
            <Route path="/ThankYou" element={<ThankYou/>}/>
        </Routes>
        <DevTools/>

    </>)
}
export default App;