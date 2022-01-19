import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/actions";
import Loading from "./Loading"
import s from "../styles/recipeDetails.module.css"


export default function Detail(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])

    let myRecipe = useSelector(state => state.detail)
    function createSummary() {
        return { __html: myRecipe.summary }
    }

    function createInstructions() {
        return { __html: myRecipe.instructions ? myRecipe.instructions : myRecipe.analyzedInstructions }
    }
    // function cleanRecipes() {

    // }

    return (
        <div>
            {Object.keys(myRecipe).length !== 0 ?
                <div className={s.aboveAll}>
                    <div className={s.all}>
                        <h1>Titulo: {myRecipe.title}</h1>
                        <img src={myRecipe.image} alt="img not found" />
                        <h2>Resumen: </h2>
                        <h3 dangerouslySetInnerHTML={createSummary()}></h3>
                        <h3>Puntuacion: {myRecipe.score ? myRecipe.score : myRecipe.spoonacularScore}</h3>
                        <h3>Puntiacion Saludable: {myRecipe.healthScore}</h3>
                        <h3>Instrucciones:</h3>
                        <h3 dangerouslySetInnerHTML={createInstructions()}></h3>
                        <h3>Dietas</h3>
                        {myRecipe.diets.map(e => e.name ? <h3>{e.name}</h3> : <h3>{e}</h3>)}

                        <div>
                            <Link to="/home">
                                <button >
                                    Volver
                                </button>
                            </Link>
                        </div>
                    </div>
                </div> : <Loading />
            }

        </div>
    )
}