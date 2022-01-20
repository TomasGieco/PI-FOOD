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
        if (myRecipe.instructions && myRecipe.instructions.length !== 0) {
            return ({ __html: myRecipe.instructions })
        }

        else if (myRecipe.analyzedInstructions.length !== 0) {
            return ({ __html: myRecipe.analyzedInstructions })
        }

        return ({ __html: "No instructions available" })
    }
    // function cleanRecipes() {

    // }
    return (
        <div>
            {Object.keys(myRecipe).length !== 0 ?
                <div className={s.aboveAll}>
                    <div className={s.all}>
                        <h1 className={s.title}>{myRecipe.title}</h1>

                        <img className={s.image} src={myRecipe.image} alt="img not found" />

                        <div className={s.fullPoints}>
                            <h3>Score: {myRecipe.score ? myRecipe.score : myRecipe.spoonacularScore}</h3>
                            <h3>Health Score: {myRecipe.healthScore}</h3>
                        </div>

                        <div className={s.fullSummary}>
                            <h2>Summary: </h2>
                            <h3 className={s.summary} dangerouslySetInnerHTML={createSummary()}></h3>
                        </div>
                        <div className={s.fullInstructions}>
                            <h3>Instructions:</h3>
                            <h3 className={s.instructions} dangerouslySetInnerHTML={createInstructions()}></h3>
                        </div>
                        <div className={s.fullDiets}>
                            <h3>Diets: </h3>
                            <div className={s.diets}>
                                {myRecipe.diets.map(e => e.name ? <h3>{e.name}</h3> : <h3>{e}</h3>)}
                            </div>
                        </div>
                        <div>

                            <Link to="/home">
                                <button className={s.button}>
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