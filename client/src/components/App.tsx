import {Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import {Toaster} from "react-hot-toast";
import {DevTools} from "jotai-devtools";
import {useAtom} from "jotai";
import Home from "./Home.tsx";

const App = () => {



    return (<>

        <Toaster position={"bottom-center"}/>
        <Routes>
            <Route path="/" element={<Home/>}/>
        </Routes>
        <DevTools/>

    </>)
}
export default App;