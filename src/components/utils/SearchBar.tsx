import React, { useState } from "react";
import module from "./SearchBar.module.css";
import Axios from 'axios'
import { AnyARecord } from "dns";

export default function SearchBar(props:{setData:any, setIsLoading:any, setError:any,setTotalPage:any, currentPage:number, setNoResult:any}) {
  
    const [search, setSearch] = useState('')

    const apiUrl = process.env.REACT_APP_API_URL;

    Axios.defaults.withCredentials = true
    function handleSubmit(event:React.FormEvent){
        event.preventDefault()
        props.setNoResult(false)
        props.setIsLoading(true)
        Axios.post(`${apiUrl}/picmes/search`,{search})
        .then((response) => {
            props.setIsLoading(false)
            response.data.pics.length ===0 && props.setNoResult(true)
            props.setData(response.data.pics)
            props.setTotalPage(response.data.totalPics)
        })
        .catch((error) => {
            props.setIsLoading(false)
            props.setError(true)
        })
    }

    function handleChange(event:React.ChangeEvent<HTMLInputElement>){
        setSearch(event.target.value)
    }
  
    return (
    <div className={module.search}>
      <div className={module.bar}>
        <form onSubmit={handleSubmit}>
            <button className={module["search-icon"]}> <img src="/icons/search2.png" alt="search icon"  /></button>
       
        <button className={module.button} type='submit'>Search</button>
        <input type="text" name="search" id="search" onChange={handleChange}/>
        </form>
      </div>
    </div>
  );
}
