import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getTitleRecipes } from "../actions/actions"
import { CgCap } from "react-icons/cg"
import s from "../styles/searchBar.module.css"

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getTitleRecipes(name))
        setName("")
    }

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <div id={s.search}>
                    <input id={s.input} type="text" placeholder="Search..." value={name} onChange={e => handleInputChange(e)} />
                    <button id={s.button} type="submit">
                        <CgCap />
                    </button>
                </div>
            </form>
        </div>
    )
}