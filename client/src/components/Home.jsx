import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { filterRecipesByDiets, filterRecipesByPoints, filterRecipesByTitle, getRecipes } from "../actions/actions";
import Card from "./Card"
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import axios from "axios";

export default function Home() {
    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.recipes)

    {/*                PAGINADO                  */ }

    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage] = useState(9)
    const [ordenTitle, setOrdenTitle] = useState("")
    const [ordenPoints, setOrdenPoints] = useState("")
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch])

    async function handleClick(e) {
        e.preventDefault()
        dispatch(getRecipes());
    }

    function handleFilterDiets(e) {
        e.preventDefault();
        dispatch(filterRecipesByDiets(e.target.value))
    }

    function handleFilterTitle(e) {
        e.preventDefault();
        dispatch(filterRecipesByTitle(e.target.value))
        setCurrentPage(1);
        setOrdenTitle(`Ordenado ${e.target.value}`)
    }

    function handleFilterPoints(e) {
        e.preventDefault();
        dispatch(filterRecipesByPoints(e.target.value))
        setCurrentPage(1);
        setOrdenPoints(`Ordenado ${e.target.value}`)
    }

    return (
        <div>
            <Link to='/recipes'> Crear Recetas </Link>
            <h1>Aguante el morfi</h1>
            <button onClick={e => { handleClick(e) }}>
                Volver a cargar todas las recetas
            </button>
            <SearchBar />
            <div>
                <select onChange={e => handleFilterTitle(e)}>
                    <option > Orden Alfabético </option>
                    <option value="asc"> A - Z </option>
                    <option value="desc"> Z - A </option>
                </select>
                <select onChange={e => handleFilterPoints(e)}>
                    <option > Orden por puntuación </option>
                    <option value="ascPoints"> Menor a mayor puntuación </option>
                    <option value="descPoints"> Mayor a menor puntuación </option>
                </select>
                <select onChange={e => handleFilterDiets(e)}>
                    <option value="all">Todas las Dietas</option>
                    <option value="gluten free">Gluten free</option>
                    <option value="dairy free">Dairy free</option>
                    <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="fodmap friendly">Fodmap friendly</option>
                    <option value="whole 30">Whole30</option>
                </select>

                <Paginado
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    paginado={paginado}
                />
                {currentRecipes?.map((e) => {
                    return (
                        <div key={e.id}>
                            <Link to={`/home/${e.id}`} >
                                <Card title={e.title} diets={e.diets.map(el => el.name ? el.name : el)} image={e.image} key={e.id} />
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}