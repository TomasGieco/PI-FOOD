import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes } from "../actions/actions";
import Card from "./Card"

export default function Home() {
    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.recipes)

    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault()
        dispatch(getRecipes());
    }

    return (
        <div>
            <Link to='/recipes'> Crear Personaje </Link>
            <h1>Aguante el morfi</h1>
            <button onClick={e => { handleClick(e) }}>
                Volver a cargar todos los personajes
            </button>

            <div>
                <select>
                    <option value="asc"> A - Z </option>
                    <option value="desc"> Z - A </option>
                </select>
                <select>
                    <option value="ascPoints"> Ascendente </option>
                    <option value="descPoints"> Descendente </option>
                </select>
                <select>
                    <option value="all">Todos</option>
                    <option value="gluten free">Gluten free</option>
                    <option value="ketogenic">Ketogenic</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="lacto vegetarian">Lacto vegetarian</option>
                    <option value="ovo vegetarian">Ovo vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescetarian">Pescetarian</option>
                    <option value="paleo">Paleo</option>
                    <option value="primal">Primal</option>
                    <option value="low fodmap">Low fodmap</option>
                    <option value="whole30">Whole30</option>
                </select>
                {allRecipes?.map((e) => {
                    return (
                        <fragment key={e.id}>
                            <Link to={`/home/${e.id}`} >
                                <h3>{e.title}</h3>
                                <h5>{e.diets}</h5>
                                <img src={e.image} alt="img not found" />
                                {/* <Card title={e.title} diets={e.diets} image={e.image} key={e.id} /> */}
                            </Link>
                        </fragment>
                    )
                })}
            </div>
        </div>
    )
}