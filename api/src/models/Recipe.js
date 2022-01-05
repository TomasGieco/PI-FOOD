const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plateSummary:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    calification:{
      type: DataTypes.INTEGER
    },
    healthyLevel:{
      type: DataTypes.INTEGER
    },
    instructions:{
      type: DataTypes.TEXT
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true,
    }
  });
};
