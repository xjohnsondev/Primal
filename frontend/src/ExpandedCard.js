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

  // If unfavored, favor and vice-versa
  async function handleFavorite(exercise) {
    const response = await PrimalApi.handleFavorite(
      user.currentUser.id,
      exercise.id
    );
    setUserFavorites(await PrimalApi.getUserFavorites(user.currentUser.id));
  }

  return (
    <div className="ex-card-background">

      <div className="expanded-div">
        <Card className="ex-card expand" variant="plain">
          <CloseIcon data-testid="close-icon" className="close-icon" onClick={closeCard} />
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

            <CardContent className="target-div">
              <Typography className="expanded-text">Target Muscle:</Typography>
              <ol className="list">
                <li key={uuidv4()}>
                  <Typography className="expanded-text">
                    {data.target}
                  </Typography>
                </li>
              </ol>
            </CardContent>
            <CardContent className="secondary-div">
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
            </CardContent>
            <CardContent className="icon">
              {userFavorites.some((favorite) => favorite.id === data.id) ? (
                <FavoriteIconFill
                data-testid="fav-icon"
                  className="fav-icon"
                  onClick={() => {
                    handleFavorite(data);
                    window.location.reload();
                  }}
                />
              ) : (
                <FavoriteIcon
                data-testid="fav-icon"
                  className="fav-icon"
                  onClick={() => handleFavorite(data)}
                />
              )}
            </CardContent>
          </CardOverflow>
        </Card>
      </div>
    </div>
  );
};

export default ExpandedCard;
