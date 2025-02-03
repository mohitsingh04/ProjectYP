import { useEffect, useState } from "react";
import { API } from "./Api";

export default function DataRequest() {
    const [User, setUser] = useState("");

    useEffect(() => {
        const getUser = () => {
            API.get("/profile").then(({ data }) => {
                setUser(data.user);
            })
        }
        getUser();
    }, [])

    return {
        User
    }
}