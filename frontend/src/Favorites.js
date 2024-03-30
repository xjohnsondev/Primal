import { useContext, useEffect, useState } from "react";
import useUserFavorites from "./hooks/useUserFavorites";
import UserContext from "./UserContext";
import ExpandedFav from "./ExpandedFav";
import PrimalApi from "./api";
import { v4 as uuidv4 } from "uuid";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";

const Favorites = () => {
  const user = useContext(UserContext);
  const [expanded, setExpanded] = useState();
  const [userFavorites, setUserFavorites] = useState([]);
  const userFavoriteIds = useUserFavorites();

  useEffect(() => {
    // Fetches exercises user has favorited
    async function fetchExerciseData() {
      if (user.currentUser && userFavoriteIds.length > 0) {
        const favoriteExercises = await Promise.all(
          userFavoriteIds.map(async (favorite) => {
            const response = await PrimalApi.getExercise(favorite.exercise_id);
            return response;
          })
        );
        setUserFavorites(favoriteExercises);
      }
    }
    fetchExerciseData();
  }, [user.currentUser, userFavoriteIds]);

  // Selects card to be expanded
  function showcaseCard(data) {
    setExpanded(data);
  }

  return (
    <>
      <h1 style={{ textTransform: "capitalize" }}>Favorites</h1>
      <div className="tar-list">
        {userFavorites.length > 0 &&
          userFavorites.map((exercise) => (
            <div key={uuidv4()}>
              <Card
                className="ex-card small-card"
                variant="plain"
                onClick={() => showcaseCard(exercise)}
              >
                <img
                  src={exercise.gif}
                  className="card-gif"
                  alt={exercise.name}
                />
                <CardOverflow
                  variant="soft"
                  sx={{ backgroundColor: "#1F2833" }}
                >
                  <Divider inset="context" />
                  <CardContent orientation="horizontal">
                    <Typography className="card-text">
                      {exercise.name}
                    </Typography>
                  </CardContent>
                </CardOverflow>
              </Card>
            </div>
          ))}
      </div>
      {expanded && (
        <ExpandedFav
          data={expanded}
          setExpanded={setExpanded}
          userFavorites={userFavorites}
          setUserFavorites={setUserFavorites}
        />
      )}
    </>
  );
};

export default Favorites;