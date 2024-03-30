import { useContext } from "react";
import PrimalApi from "./api";
import { v4 as uuidv4 } from "uuid";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIconFill from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import UserContext from "./UserContext";
import "./ExpandedCard.css";

const ExpandedCard = ({
  data,
  setExpanded,
  userFavorites,
  setUserFavorites,
}) => {
  const user = useContext(UserContext);

  function closeCard() {
    setExpanded();
  }

  async function handleFavorite(exercise) {
    const response = await PrimalApi.handleFavorite(
      user.currentUser.id,
      exercise.id
    );
    setUserFavorites(await PrimalApi.getUserFavorites(user.currentUser.id));
    console.log(response.message);
  }

  return (
    <div className="expanded-div">
      <Card className="ex-card expand" variant="plain">
        <CloseIcon className="close-icon" onClick={closeCard} />
        <img src={data.gif} className="card-gif expand-gif" alt={data.name} />

        <CardOverflow variant="soft" sx={{ backgroundColor: "#1F2833" }}>
          <Divider inset="context" />
          <CardContent orientation="horizontal">
            <Typography className="expanded-text ex-title">
              {data.name}
            </Typography>
          </CardContent>

          <CardContent orientation="vertical">
            <Typography className="expanded-text">Instructions:</Typography>

            <ol className="list">
              {data.instructions &&
                data.instructions.map((instruction) => (
                  <li key={uuidv4()}>
                    <Typography className="expanded-text">
                      {instruction}
                    </Typography>
                  </li>
                ))}
            </ol>
          </CardContent>

          <CardContent>
            <Typography className="expanded-text">
              Secondary Muscles:
            </Typography>
            <ol className="list">
              {data.secondary &&
                data.secondary.map((sec) => (
                  <li key={uuidv4()}>
                    <Typography className="expanded-text">{sec}</Typography>
                  </li>
                ))}
            </ol>
            {userFavorites.some(
              (favorite) => favorite.exercise_id === data.id
            ) ? (
              <FavoriteIconFill
                className="fav-icon"
                onClick={() => handleFavorite(data)}
              />
            ) : (
              <FavoriteIcon
                className="fav-icon"
                onClick={() => handleFavorite(data)}
              />
            )}
          </CardContent>
        </CardOverflow>
      </Card>
    </div>
  );
};

export default ExpandedCard;