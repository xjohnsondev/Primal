import { useContext } from "react";
import UserContext from "./UserContext";
import Typography from "@mui/joy/Typography";

import "./Home.css";

const Home = () => {
  const user = useContext(UserContext);
  return (
    <div className="home-display">
      <img src="/muscleguy.png" alt="muscleguy" className="muscleguy" />
      <img src="/musclegirl.png" alt="musclegirl" className="musclegirl" />
      <div className="landing-div">
        <div className="title-div">
          <Typography>
            PRIMAL
          </Typography>
        </div>
        <div className="title-para">
          <Typography>
            Your go-to source for a plethora of workout ideas tailored to meet
            your fitness needs. Our platform is dedicated to providing you
            with a diverse range of effective exercises designed to help you
            reach your fitness goals, whether you're aiming to build strength,
            improve endurance, or enhance flexibility.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Home;
