import React from "react";

export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="paginado">
                {pageNumbers?.map(number => {
                    return (
                        <li className="number" key={number}>
                            <a onClick={() => paginado(number)}>{number}</a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}