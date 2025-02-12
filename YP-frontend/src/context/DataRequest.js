// DataRequest.js
import { useEffect, useState } from "react";
import { API } from "./Api";

export default function DataRequest() {
  const [User, setUser] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await API.get("/profile");
        setUser(response.data.user); // Set user data after fetch
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []); // Empty dependency array ensures this runs once on mount

  return { User };
}
