import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import LoginSignup from "./LoginSignup";
import Navbar from "./Navbar";
import ExerciseCats from "./ExerciseCats";
import TargetExercises from "./TargetExercises";
import Favorites from "./Favorites";
import NotFound from "./NotFound";
import Refresh from "./Refresh";

const RoutesList = ({login, signup, logout}) => {
    return (
        <BrowserRouter>
        <Navbar logout={logout} />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login-signup" element={<LoginSignup login={login} signup={signup}/>} />
                <Route exact path="/exercises" element={<ExerciseCats />} />
                <Route exact path="/exercises/target/:target" element={<TargetExercises />} />
                <Route exact path="/user/:userId/favorites" element={<Favorites />} />
                <Route exact path="/exercises/data/refresh" element={<Refresh />} />
                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}

export default RoutesList;