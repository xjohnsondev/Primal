import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";

import ExpandedCard from "./ExpandedCard";
import PrimalApi from "./api";
import { v4 as uuidv4 } from "uuid";
import "./TargetExercises.css";

const TargetExercises = () => {
  const { target } = useParams();
  const [exercises, setExercises] = useState([]);
  const [expanded, setExpanded] = useState();

  useEffect(() => {
    async function getTargetExercises() {
      try {
        const response = await PrimalApi.getTargetExercises(target);
        setExercises(response.target);
        console.log(response.target);
      } catch (e) {
        console.error("Error fetching data");
      }
    }
    getTargetExercises();
  }, []);

  function showcaseCard(data) {
    setExpanded(data);
    // console.log(data);
  }
  

  return (
    <>
      <h1 style={{ textTransform: "capitalize" }}>{target}</h1>
      <div className="tar-list">
        {exercises.map((exercise) => (
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

              <CardOverflow variant="soft" sx={{ backgroundColor: "#1F2833" }}>
                <Divider inset="context" />
                <CardContent orientation="horizontal">
                  <Typography className="card-text">{exercise.name}</Typography>
                </CardContent>
              </CardOverflow>
            </Card>
          </div>
        ))}
      </div>
      {expanded && <ExpandedCard data={expanded} setExpanded={setExpanded}/>}

    </>
  );
};

export default TargetExercises;
