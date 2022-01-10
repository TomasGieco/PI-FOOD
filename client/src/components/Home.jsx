import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getRecipes } from "../actions";

export default function Home(){
    const dispatch = useDispatch()
    const allCharacters = useSelector((state) => state.recipes)

    useEffect(()=>{
        dispatch(getRecipes());
    },[])

    function handleClick(){
        e.preventDefault()
        dispatch(getRecipes());
    }

    return(
        <div>
            <Link to= '/recipes'> Crear Personaje </Link>
            <h1>Aguante el morfi</h1>
            <button onClick={e=> {handleClick(e)}}>
                Volver a cargar todos los personajes
            </button>
            <div>
                
            </div>
        </div>
    )


}