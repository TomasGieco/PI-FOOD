import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getTitleRecipes } from "../actions/actions"

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
                <input type="text" placeholder="Buscar..." value={name} onChange={e => handleInputChange(e)} />
                <button type="submit">
                    Buscar
                </button>
            </form>
        </div>
    )
}