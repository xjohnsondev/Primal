import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Navbar from "./Navbar";

const RoutesList = () => {
    return (
        <BrowserRouter>
        <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesList;