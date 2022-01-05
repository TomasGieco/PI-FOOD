const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const Recipe = require('../models/Recipe');
const Diet = require('../models/Diet');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () =>{
    const apiUrl = await axios.get('https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&diet&apiKey=8f2711bdb9cf485eb121507bd0055230');
    const apiInfo = await apiUrl.data.results.map(el=>{
        return {
            title: el.title,
            image: el.image,
            diets: el.diets,
            score: el.spoonacularScore,
            summary: el.summary,
            healthScore: el.healthScore,
            instructions:el.analyzedInstructions
        }
    });
    return apiInfo;
}

const getDbInfo = async ()=>{
    return await Recipe.findAll({
        include:{
            model: Diet,
            attributes: ['name'],
            through:{
                attributes:[],
            }
        }
    })
}

const getAllRecipes = async ()=>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

router.get('/recipes', (req,res)=>{
    const recipes = getAllRecipes()
});

module.exports = router;
