import React from "react";
import s from "../styles/paginado.module.css"

export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className={s.all}>
            <ul className={s.paginado}>
                {pageNumbers?.map(number => {
                    return (
                        <li className={s.number} key={number}>
                            <a onClick={() => paginado(number)}>{number}</a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}