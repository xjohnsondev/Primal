import { useContext, useEffect, useState } from "react";
import PrimalApi from "../api";
import UserContext from "../UserContext";

const useUserFavorites = () => {
  const user = useContext(UserContext);
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    async function fetchUserFavorites() {
      if (user && user.currentUser) {
        try {
          const response = await PrimalApi.getUserFavorites(user.currentUser.id);
          setUserFavorites(response);
        } catch (e) {
          console.error("Error fetching user favorites:", e);
        }
      }
    }
    if (user) fetchUserFavorites();
  }, [user]);

  return userFavorites;
};

export default useUserFavorites;