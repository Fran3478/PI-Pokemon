const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    /* Para no generar conflictos en el front con los ids de los pokemons obtenidos desde la api (nros enteros)
        se utiliza el tipo UUID (cadenas de 5 numeros hexadecimales generadas de forma aleatoria y separadas 
        entre si por guiones)
    */
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true // Se define como true para que no permita nombres duplicados
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    /* Para los atributos hp, attack, defense, height y weight, se realizan validaciones de un minimo de 0
      y un maximo de 999 (siendo un maximo de 9999 en el caso de weight), y se define como valor por defecto 0,
      siendo este de utilidad real unicamente cuando se realizan cargas de datos directamente a la bd a modo de
      testeo puesto que se validan los datos recibidos por consulta (en los casos de los tres primeros atributos,
      los restantes podrian admitir nulo por lo cual si resulta necesario en todos los casos)
    */
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 999
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 999
      }
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 999
      }
    },
    speed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 999
      }
    },
    height:{
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 999
      }
    },
    weight:{
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 9999
      }
    },
  },
  {
    timestamps: false
  });
};
