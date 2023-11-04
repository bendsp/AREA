import { ServicesProps } from "../interfaces/services";
import { Dispatch, SetStateAction } from "react";

interface FetchAboutJsonParams {
    setServices: Dispatch<SetStateAction<ServicesProps[]>>
}

const fetchAboutJson = async () => {
    const response = await fetch('http://localhost:8080/about.json');

    const data = await response.json();

    return data.server.services;
}

export default fetchAboutJson
