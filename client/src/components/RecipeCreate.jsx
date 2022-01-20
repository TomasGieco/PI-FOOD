import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom"
import { postRecipes, getDiets } from "../actions/actions"
import { useDispatch, useSelector } from "react-redux";
import create from "../images/create.svg"
import s from "../styles/recipeCreate.module.css"

export default function RecipeCreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const diets = useSelector(state => state.diets)

    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        title: "",
        summary: "",
        score: "",
        healthScore: "",
        analyzedInstructions: [],
        image: "",
        diets: []
    })

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch]);

    function validate(input) {
        let errors = {};
        if (!input.title) {
            errors.title = "Title required"
        }

        else if (!input.summary) {
            errors.summary = "Summary required"
        }

        else if (!input.score) {
            errors.score = "Score required"
        }
        else if (input.score > 100) {
            errors.score = "Score max is 100"
        }
        else if (input.score < 1) {
            errors.score = "Score min is 1"
        }

        else if (!input.healthScore) {
            errors.healthScore = "Health score required"
        }
        else if (input.healthScore > 100) {
            errors.healthScore = "Health Score max is 100"
        }
        else if (input.healthScore < 1) {
            errors.healthScore = "Health Score min is 1"
        }

        else if (!input.analyzedInstructions) {
            errors.analyzedInstructions = "Instructions required"
        }
        return errors;
    }

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }



    function handleSelect(e) {
        if (e.target.value !== "Selecciona sus tipos de dieta" && !input.diets.includes(e.target.value)) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postRecipes(input))
        alert("Se te creo crack")
        setInput({
            title: "",
            summary: "",
            score: "",
            healthScore: "",
            analyzedInstructions: [],
            image: "",
            diets: []
        })
        history.push("/home")
    }

    function handleDelete(e) {
        setInput({
            ...input,
            diets: input.diets.filter(diet => diet !== e)
        })
    }

    return (
        <div className={s.aboveAll}>
            <div className={s.all}>

                <img src={create} alt="a" />

                <form className={s.form} onSubmit={e => handleSubmit(e)}>
                    <div className={s.search}>

                        <input className={s.input} placeholder="Title..." type="text" value={input.title} name="title"
                            onChange={handleChange} />

                    </div>
                    {errors.title && (<p className={s.error}>{errors.title}</p>)}

                    <div className={s.search}>
                        <textarea className={s.textarea} rows="5" cols="40" placeholder="Summary..." type="text" value={input.summary} name="summary"
                            onChange={handleChange} />

                    </div>
                    {errors.summary && (<p className={s.error}>{errors.summary}</p>)}

                    <div className={s.search}>

                        <input className={s.input}
                            max="100"
                            min="1"
                            placeholder="Score..."
                            type="number"
                            value={input.score}
                            name="score"
                            onChange={handleChange} />

                    </div>
                    {errors.score && (<p className={s.error}>{errors.score}</p>)}

                    <div className={s.search}>

                        <input className={s.input}
                            max="100"
                            min="1"
                            placeholder="Health Score..."
                            type="number"
                            value={input.healthScore}
                            name="healthScore"
                            onChange={handleChange} />

                    </div>
                    {errors.healthScore && (<p className={s.error}>{errors.healthScore}</p>)}

                    <div className={s.search}>

                        <input className={s.input} placeholder="Instructions..." type="text" value={input.analyzedInstructions} name="analyzedInstructions"
                            onChange={handleChange} />

                    </div>
                    {errors.analyzedInstructions && (<p className={s.error}>{errors.analyzedInstructions}</p>)}

                    <div className={s.search}>

                        <input className={s.input} placeholder="URL Image..." type="text" value={input.image} name="image"
                            onChange={handleChange} />

                    </div>
                    <select className={s.diet} onChange={e => handleSelect(e)}>
                        <option>Selecciona sus tipos de dieta</option>
                        {diets.map(diet => {
                            if (diet.name) {
                                console.log(diet.name)
                            } else {
                                diet = diet[0].toUpperCase() + diet.substring(1)
                                return (< option value={diet} > {diet}</option>)
                            }
                        }
                        )}
                    </select>
                    <ul className={s.list}>
                        <li>{input.diets.map(el => {
                            el = el[0].toUpperCase() + el.substring(1)
                            return (
                                <div className={s.delete}>
                                    <div className={s.subDelete}>
                                        <p className={s.deleteText}>{el}</p>
                                        <a className={s.deleteButton} onClick={() => handleDelete(el)}>X</a>
                                    </div>
                                </div>
                            )
                        })}
                        </li>
                    </ul>
                    {Object.keys(errors).length !== 0 ? <a className={s.button} onClick={e => alert("Finish your form first")}>Crear</a> : <button className={s.button} type="submit">Crear</button>}

                    <Link to="/home">
                        <button className={s.button} type="button">Volver</button>
                    </Link>
                </form>
            </div>
        </div >
    )
}