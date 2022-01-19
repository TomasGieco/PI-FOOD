import React from "react";
import { Link } from 'react-router-dom'
import s from "../styles/card.module.css"

export default function Card({ title, image, diets, id }) {
    let dietas = "Diets: "
    diets.map(e => dietas = `${dietas} ${e},`)
    dietas = dietas.substring(0, dietas.length - 1)

    return (
        <div className={s.all}>
            <Link to={`/home/${id}`} >
                <h3 className={s.title}>{title}</h3>
            </Link>
            <h4 className={s.diet}>{dietas}</h4>
            <img src={image} alt="img not found" className={s.image} />
        </div >
    );
}