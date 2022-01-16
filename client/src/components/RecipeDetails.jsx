import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/actions";

export default function Detail(props) {
    console.log(props)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])

    const myRecipe = useSelector(state => state.detail)

    return (
        <div>
            {
                <div>
                    <h1>Titulo: {myRecipe[0].name}</h1>
                    <img src={myRecipe[0].image} alt="img not found" />
                    <h2>Resumen: {myRecipe[0].summary}</h2>
                    <h3>Puntuacion: {myRecipe[0].score ? myRecipe[0].score : myRecipe[0].spoonacularScore}</h3>
                    <h3>Puntiacion Saludable: {myRecipe[0].healthScore}</h3>
                    <h3>Instrucciones: {myRecipe[0].instructions ? myRecipe[0].instructions : myRecipe[0].analyzedInstructions}</h3>
                    <h3>Dietas</h3>
                    {myRecipe[0].diets.map(e => {
                        <h3>{e}</h3>
                    })}
                </div>

            }
        </div>
    )
}