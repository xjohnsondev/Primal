import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrimalApi from "./api";

const Refresh = () => {
    const navigate = useNavigate();

    useEffect(()=> {
        async function refreshData(){
            await PrimalApi.refreshData();
            navigate("/");
        }
        refreshData();
    }, [])
    return null;
}

export default Refresh;