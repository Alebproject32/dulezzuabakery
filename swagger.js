const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "DulezzuaBakery API",
    description: "API para la gestión de tortas y productos de panadería",
    version: "1.0.0",
  },
  host: "localhost:8080", // Luego lo cambiaremos a la URL de Render
  basePath: "/",
  schemes: ["http"],
  definitions: {
    Cake: {
      name: "Chocolate cake",
      flavor: "Vanilla and Chocolate",
      price: 30.0,
      size: "Medium cake, 8 inches",
      servings: 20,
      ingredients: ["flour", "eggs", "chocolate"],
      description: "A deliciouse cake to share with family or friends.",
      isAvailable: true,
    },
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"]; // Apunta a tu archivo de rutas principal

swaggerAutogen(outputFile, endpointsFiles, doc);
