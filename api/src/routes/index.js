const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Recipe, Diet } = require('../db');
const e = require('express');
const { API_KEY } = process.env

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?&addRecipeInformation=true&diet&apiKey=${API_KEY}`);
    const apiInfo = await apiUrl.data.results.map(el => {
        return {
            id: el.id,
            title: el.title,
            image: el.image,
            diets: el.diets,
            score: el.spoonacularScore,
            summary: el.summary,
            healthScore: el.healthScore,
            instructions: el.analyzedInstructions
        }
    });
    return apiInfo;
}

const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}


const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

router.get('/recipes', async (req, res) => {
    const recipes = await getAllRecipes()
    const name = req.query.name
    if (name) {
        const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&query=${name}&addRecipeInformation=true&diet&apiKey=${API_KEY}`);
        
        filtered = apiUrl.data.results.concat(await getDbInfo())
        let recipeNames = filtered.filter(e => e.title.toLowerCase().includes(name.toLowerCase()));
        
        recipeNames.length ?
            res.status(200).send(recipeNames) :
            res.status(404).send('No hay receta Disponible')
    }
    else {
        res.status(200).send(recipes)
    }
});

router.get('/recipes/:id', async (req, res) => {
    const { id } = req.params
    try{
        const recipeId = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
        recipeId ?
        res.status(200).json(recipeId.data) :
        res.status(404).send('No existe receta con ese Id')
    }catch(error){
        const recipeId = await Recipe.findByPk(id,{
            include:{
                model:Diet,
                through: {attributes: []},
                 attributes: ["name"],
                 exclude:["recipe_diets"]}
                    })
        recipeId ?
        res.status(200).json(recipeId) :
        res.status(404).send('No existe receta con ese Id')
    } 
});

router.get('/types', async (req, res) => {
    // let dietArray = Diet.findAll({ attributers: "name" });
    let dietArray = []
    let apiInfo = await getAllRecipes()
    apiInfo.forEach(e => {
        e.diets.forEach(element => {
            if (!dietArray.includes(element)) {
                dietArray = dietArray.concat(element);
            }
        })
    });

    res.status(200).json(dietArray)
});

router.post('/recipe', async (req, res) => {
    const { title, summary, score, healthScore, analyzedInstructions, image, createdInDb, diets } = req.body

    let recipeCreated = await Recipe.create({
        title,
        summary,
        score,
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
