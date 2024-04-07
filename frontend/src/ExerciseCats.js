import { useEffect, useState } from 'react';
import { Typography, Paper } from "@mui/material";
import Link from "@mui/joy/Link";
import { v4 as uuidv4 } from "uuid";
import PrimalApi from './api';
import "./ExerciseCats.css";

const ExerciseCats = () => {
    const [targets, setTargets] = useState([]);

    useEffect(() => {
        // Gets all target muscle groups
        async function getTargets() {
            try {
                const targets = await PrimalApi.getTargets();
                setTargets(targets.targets);
            } catch (error) {
                console.error('Error fetching targets:', error);
            }
        }
        getTargets();
    },[])

    return (
        <div data-testid="exercise-cats" className="cat-list">
            {targets.map((target) => (
                <div  key={uuidv4()}>
                    <Link href={`/exercises/target/${target.target}`} className='link'>
                    <Paper className='paper cat-card' elevation={3}>
                        <Typography className='text'>
                            {target.target}
                        </Typography>
                    </Paper>
                    </Link>
                </div>
            ))}
        </div>
    )
};

export default ExerciseCats;