import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { filterRecipesByDiets, filterRecipesByPoints, filterRecipesByTitle, getRecipes } from "../actions/actions";
import Card from "./Card"
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import s from "../styles/home.module.css"
import title from "../images/title.svg"

export default function Home() {
    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.recipes)

    {/*                PAGINADO Y FILTROS                  */ }

    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage] = useState(9)
    const [ordenTitle, setOrdenTitle] = useState("")
    const [ordenPoints, setOrdenPoints] = useState("")
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

    {/*                FIN PAGINADO Y FILTROS                  */ }

    {/*                FUNCIONES                  */ }
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
    {/* ---------------- FIN FUNCIONES ---------------- */ }


    {/* ---------------- RENDERIZADO ---------------- */ }
    return (
        <div className={s.all}>
            <div>
                <img src={title} alt="a" />
                <h2><Link to='/recipes' className={s.create}> Creat your own Recipes </Link></h2>
                
                <button onClick={e => { handleClick(e) }}>
                    Reload all recipes
                </button>

                {/* ---------------- FILTROS ---------------- */ }
                <SearchBar />
            
                <select onChange={e => handleFilterTitle(e)}>
                    <option> Alphabetical order </option>
                    <option value="asc"> A - Z </option>
                    <option value="desc"> Z - A </option>
                </select>
                <select onChange={e => handleFilterPoints(e)}>
                    <option> Points </option>
                    <option value="ascPoints"> Lowest to highest score </option>
                    <option value="descPoints"> Highest to lowest score </option>
                </select>
                <select onChange={e => handleFilterDiets(e)}>
                    <option value="all">All diets</option>
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

                {/* ---------------- FIN FILTROS ---------------- */ }

                {/* ---------------- PAGINADO ---------------- */ }
                <Paginado
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    paginado={paginado}
                />
                {/* ---------------- FIN PAGINADO ---------------- */ }
                
            </div>
            {/* ---------------- RECETAS ---------------- */ }
            <div className={s.recipes}>
                {currentRecipes?.map((e) => {
                    return (
                        <Card title={e.title} diets={e.diets.map(el => el.name ? el.name : el)} image={e.image} id={e.id} key={e.id} />
                    )
                })}
            </div>
            {/* ---------------- FIN RECETAS ---------------- */ }

        </div>
    )
    {/* ---------------- FIN RENDERIZADO ---------------- */ }
}