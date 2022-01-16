import axios from "axios"

export function getRecipes() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/recipes");
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}

export function getTitleRecipes(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/recipes?name=${payload}`)
            return dispatch({
                type: "GET_TITLE",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getDiets() {
    return async function (dispatch) {
        const info = await axios.get("http://localhost:3001/types")
        return dispatch({
            type: "GET_DIETS",
            payload: info.data
        })
    }
}

export function postRecipes(payload) {
    return async function () {
        const json = await axios.post("http://localhost:3001/recipe", payload)
        return json
    }
}

export function filterRecipesByDiets(payload) {
    return {
        type: 'FILTER_BY_DIETS',
        payload
    }
}

export function filterRecipesByTitle(payload) {
    return {
        type: 'FILTER_BY_TITLE',
        payload
    }
}

export function filterRecipesByPoints(payload) {
    return {
        type: 'FILTER_BY_POINTS',
        payload
    }
}

export function getDetail(payload) {
    return async function (dispatch) {
        try {
            const json = await axios.get(`http://localhost:3001/recipes/${payload}`)
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}