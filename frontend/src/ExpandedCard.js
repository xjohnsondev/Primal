import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import './ExpandedCard.css';

const ExpandedCard = ({data}) => {
    console.log(data);
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

  return (
    <div className="expanded-div">
        <Card>
            <h2>{data.name}</h2>
        </Card>
    </div>
    )
};

export default ExpandedCard;
