
import { useContext } from "react";
import { createContext } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useState } from "react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

//we are trying to connect front end with backend using create context hook:
const AppContext = createContext();

export const AppProvider = ({children})=>{
    const navigate = useNavigate();
    const [token,setToken ] = useState(null);
    const [blogs,setBlogs] = useState([]);
    const [input,setInput] = useState("");

    const fetchBlogs = async()=>{
        try {
           const {data} = await axios.get('/api/blog/all');
           data.success ? setBlogs(data.blogs) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }



    useEffect(()=>{
        
        const token = localStorage.getItem('token');
        if (!token) return toast.error("No token found");

        if(token){
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }
        fetchBlogs();
    },[])

    const value ={
        axios,navigate,token,setToken,blogs,setBlogs,input,setInput
    };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=>{
    return useContext(AppContext);
}