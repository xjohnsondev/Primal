import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import "./ExpandedCard.css";
import { v4 as uuidv4 } from "uuid";
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIconFill from '@mui/icons-material/Favorite';
import PrimalApi from "./api";
import {useContext } from "react";
import UserContext from "./UserContext";

const ExpandedCard = ({ data, setExpanded }) => {
    const user = useContext(UserContext);
  console.log(data);
  console.log(user.currentUser);
  //   const data = {
  //     id: 2649,
  //     gif: "https://v2.exercisedb.io/image/qC3lqBkzUjNPWM",
  //     target: "abs",
  //     name: "3/4 sit-up",
  //     instructions: [
  //       "Lie flat on your back with your knees bent and feet flat on the ground.",
  //       "Place your hands behind your head with your elbows pointing outwards.",
  //       "Engaging your abs, slowly lift your upper body off the ground, curling forward until your torso is at a 45-degree angle.",
  //       "Pause for a moment at the top, then slowly lower your upper body back down to the starting position.",
  //       "Repeat for the desired number of repetitions.",
  //     ],
  //     secondary: ["hip flexors", "lower back"],
  //   };

  function closeCard(){
    setExpanded();
  }

  async function handleFavorite(exercise){
    console.log(exercise);
    const response = await PrimalApi.handleFavorite(user.currentUser.id, exercise.id); 
    console.log(response);
}

  return (
    <div className="expanded-div">
      <Card className="ex-card expand" variant="plain">
        <CloseIcon className="close-icon" onClick={closeCard}/>
        <img src={data.gif} className="card-gif expand-gif" alt={data.name} />

        <CardOverflow variant="soft" sx={{ backgroundColor: "#1F2833" }}>
          <Divider inset="context" />
          <CardContent orientation="horizontal">
            <Typography className="expanded-text ex-title">
              {data.name}
            </Typography>
          </CardContent>
        
          <CardContent orientation="vertical" >
          <Typography className="expanded-text">Instructions:</Typography>

            <ol className="list">
            {data.instructions.map((instruction) => (
              <li key={uuidv4()}><Typography className="expanded-text">{instruction}</Typography></li>
            ))}
            </ol>
          </CardContent>

          <CardContent>
            <Typography className="expanded-text">
              Secondary Muscles:
            </Typography>
            <ol className="list">
              {data.secondary.map((sec) => (
                <li key={uuidv4()}>
                  <Typography className="expanded-text">{sec}</Typography>
                </li>
              ))}
            </ol>
            <FavoriteIcon className="fav-icon" onClick={() => handleFavorite(data)}/>

          </CardContent>
        </CardOverflow>
      </Card>
    </div>
  );
};

export default ExpandedCard;
