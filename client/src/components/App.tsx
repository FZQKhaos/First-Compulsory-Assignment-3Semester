import {Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import {Toaster} from "react-hot-toast";
import {DevTools} from "jotai-devtools";
import Home from "./Home.tsx";
import Orders from "./Order/OrdersList.tsx";
import NavigationBar from "./NavigationBar.tsx";
import Customer from "./Order/ConfirmOrder.tsx";
import AdminPage from "./AdminPage.tsx";
import ProductManager from "./Product/ProductManager.tsx";

const App = () => {



    return (<>

        <Toaster position={"bottom-center"}/>
        <NavigationBar />
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Orders" element={<Orders/>}/>
            <Route path="/Customer" element={<Customer/>}/>
            <Route path="/Admin" element={<AdminPage/>}/>
            <Route path="/ProductManager" element={<ProductManager/>}/>
        </Routes>
        <DevTools/>

    </>)
}
export default App;