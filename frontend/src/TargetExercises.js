import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PrimalApi from "./api";

const TargetExercises = () => {
    const { target } = useParams(); 
    console.log(target, typeof target === "string");
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        async function getTargetExercises() {
            try {
                const response = await PrimalApi.getTargetExercises(target);
                setExercises(response.target);
                console.log(response.target);
            } catch(e){
                console.error("Error fetching data")
            }
        }
        getTargetExercises();
    }, [])

    return (
        <>
        <h1>Lorem</h1>
        {console.log(exercises)}
        </>
    )
};

export default TargetExercises;