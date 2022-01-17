import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom"
import { postRecipes, getDiets } from "../actions/actions"
import { useDispatch, useSelector } from "react-redux";

export default function RecipeCreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const diets = useSelector(state => state.diets)

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

    function handleChange(e) {
        { console.log("input", input.diets) }
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
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
        <div>
            <Link to="/home">
                <button>Volver</button>
            </Link>
            <h1>¡Creá tu Receta!</h1>

            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={input.title} name="title"
                        onChange={handleChange} />
                </div>
                <div>
                    <label>Resumen:</label>
                    <input type="text" value={input.summary} name="summary"
                        onChange={handleChange} />
                </div>
                <div>
                    <label>Puntuacion de Receta</label>
                    <input type="number" value={input.score} name="score"
                        onChange={handleChange} />
                </div>
                <div>
                    <label>Puntuacion Saludable:</label>
                    <input type="number" value={input.healthScore} name="healthScore"
                        onChange={handleChange} />
                </div>
                <div>
                    <label>Instrucciones</label>
                    <input type="text" value={input.analyzedInstructions} name="analyzedInstructions"
                        onChange={handleChange} />
                </div>
                <div>
                    <label>Imagen: </label>
                    <input type="text" value={input.image} name="image"
                        onChange={handleChange} />
                </div>
                <select onChange={e => handleSelect(e)}>
                    <option>Selecciona sus tipos de dieta</option>
                    {diets.map(diet => diet.name ?
                        console.log(diet.name) :
                        <option value={diet}>{diet}</option>
                    )}
                </select>
                <ul><li>{input.diets.map(el => {
                    return (
                        <div>
                            <p>{el}</p>
                            <button onClick={() => handleDelete(el)}>X</button>
                        </div>)
                })}</li></ul>

                <button type="submit">Crear</button>
            </form>
        </div>
    )
}