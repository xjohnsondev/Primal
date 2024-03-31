import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrimalApi from "./api";

const Refresh = () => {
    const navigate = useNavigate();

    // Refreshes data to bring app up to date with API refresh
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