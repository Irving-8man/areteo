import { useNavigate } from "react-router-dom";
import { useSesion } from "./useSesion";
import { useEffect } from "react";


export default function useRedirecSesion(){
    const{isAutenticado} =  useSesion()
    const navigate = useNavigate();
    useEffect(() => {
        if (isAutenticado) {
            navigate("/dashboard");
        }
    }, [isAutenticado, navigate]);
}