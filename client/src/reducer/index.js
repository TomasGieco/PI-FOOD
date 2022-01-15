
const initialState = {
    recipes: [],
    allRecipes: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }

        case 'FILTER_BY_DIETS':
            const allRecipes = state.allRecipes
            const dietsFiltered = action.payload === 'all' ?
                allRecipes :
                allRecipes.filter(el => el.diets.includes(action.payload) ||
                    el.diets.map(e => e.name).includes(action.payload))

            return {
                ...state,
                recipes: dietsFiltered
            }

        case 'FILTER_BY_TITLE':
            let sortedArr = action.payload === 'asc' ?
                state.recipes.sort(function (a, b) {
                    if (a.title > b.title) {
                        return 1;
                    }
                    if (b.title > a.title) {
                        return -1;
                    }
                    return 0;
                })
                :
                state.recipes.sort(function (a, b) {
                    if (a.title > b.title) {
                        return -1;
                    }
                    if (b.title > a.title) {
                        return 1;
                    }
                    return 0;
                })

            return {
                ...state,
                recipes: sortedArr
            }

        case 'FILTER_BY_POINTS':
            let sortedArrPoints = action.payload === 'ascPoints' ?
                state.recipes.sort(function (a, b) {
                    if (a.score > b.score) {
                        return 1;
                    }
                    if (b.score > a.score) {
                        return -1;
                    }
                    return 0;
                })
                :
                state.recipes.sort(function (a, b) {
                    if (a.score > b.score) {
                        return -1;
                    }
                    if (b.score > a.score) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                recipes: sortedArrPoints
            }
        case 'GET_TITLE':
            return {
                ...state,
                recipes: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;