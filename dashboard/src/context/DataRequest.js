// DataRequest.js
import { useEffect, useState } from "react";
import { API } from "./Api";

export default function DataRequest() {
  const [User, setUser] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await API.get("/profile");
        setUser(response.data.user);
      } catch (error) {
        console.error(error?.response?.data?.error);
      }
    };
    getUser();
  }, []);

  return { User };
}
