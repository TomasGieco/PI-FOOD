import React from "react";
import { Link } from 'react-router-dom'
import s from "../styles/landingPage.module.css"

export default function LandingPage() {
    return (
        <div className={s.aboveAll}>
            <div className={s.all}>
                <div>
                    <h1 className={s.title}>Food App</h1>
                </div>
                <div>
                    <Link to="/home">
                        <button className={s.button}>Ingresar</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}