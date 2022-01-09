const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Recipe,Diet} = require('../db');
const e = require('express');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () =>{
    const apiUrl = await axios.get('https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&diet&apiKey=8f2711bdb9cf485eb121507bd0055230');
    const apiInfo = await apiUrl.data.results.map(el=>{
        return {
            id: el.id,
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

router.get('/recipes', async (req,res)=>{
    const recipes = await getAllRecipes()
    const name = req.query.name
    if(name){
        let recipeNames = recipes.filter(e => e.title.toLowerCase().includes(name.toLowerCase()));
        recipeNames.length ? 
        res.status(200).send(recipeNames) : 
        res.status(404).send('No hay receta Disponible')
    }
    else{
        res.status(200).send(recipes)
    }
});

router.get('/recipes/:id', async (req,res)=>{
    const recipes = await getAllRecipes()
    const { id } = req.params
    
    let recipeId = recipes.find( e => e.id == id)
    recipeId ?
    res.status(200).json({summary: recipeId.summary, diets: recipeId.diets}):
    res.status(404).send('No existe receta con ese Id')
});

router.get('/types', async (req,res)=>{
    let apiInfo = await getAllRecipes()
    let dietArray = []
    let defaultDiet= [
        "gluten free",
        "ketogenic",
        "vegetarian",
        "lacto vegetarian",
        "ovo vegetarian",
        "vegan",
        "pescetarian",
        "paleo",
        "primal",
        "low fodmap",
        "whole30",
    ]
    apiInfo.forEach(e => {
        e.diets.forEach(element=>{
            if(!dietArray.includes(element)){
                dietArray = dietArray.concat(element);
            }
        })
    });
    if(dietArray.length){
        dietArray.map(e => Diet.create({ name: e }));
    }else{

    }
    res.status(200).json(dietArray)
});

router.post('/recipe', async (req,res)=>{
    const { title, summary, spoonacularScore, healthScore, analyzedInstructions, image, createdInDb, diets } = req.body

    let recipeCreated = await Recipe.create({
        title, 
        summary,
        spoonacularScore, 
        healthScore, 
        analyzedInstructions, 
        image, 
        createdInDb
    })

    let dietDb = await Diet.findAll({
        where: { name: diets }
    });

    recipeCreated.addDiet(dietDb)
    res.send('Receta cargada con exito')
});

module.exports = router;
