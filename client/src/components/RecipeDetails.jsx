import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/actions";

export default function RecipeDetails(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])

    const myRecipe = useSelector(state => state.detail)
    return (
        <div>
            {Object.keys(myRecipe).length !== 0?
            <div>
                <h1>Titulo: {myRecipe.title}</h1>
                <img src={myRecipe.image} alt="img not found" />
                    <h2>Resumen: {myRecipe.summary}</h2>
                <h3>Puntuacion: {myRecipe.score}</h3>
                <h3>Puntiacion Saludable: {myRecipe.healthScore}</h3>
                <h3>Instrucciones: {myRecipe.instructions ? myRecipe.instructions : myRecipe.analyzedInstructions}</h3>
                <h3>Dietas</h3>
                {myRecipe.diets.map(e=> e.name? <h3>{e.name}</h3> : <h3>{e}</h3>) }
            </div> : <p>Loading...</p>
            }
            <div>
                <Link to="/home">
                    <button>
                        Volver
                    </button>
                </Link>
            </div>
        </div>
    )
}