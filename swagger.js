const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "DulezzuaBakery API",
    description: "API para la gestión de tortas y productos de panadería",
    version: "1.0.0",
  },
  host: "dulezzuabakery.onrender.com", // Luego lo cambiaremos a la URL de Render
  basePath: "/",
  schemes: ["https"],
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
    Bread: {
      name: "Sourdough Bread",
      type: ["Artisanal", "Industrial"],
      price: 5.5,
      weight: "600g",
      ingredients: ["strength flour", "water", "salt", "sourdough"],
      isVegan: true,
      description: "Slow-fermented bread with a crispy crust.",
      isFresh: true,
    },
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"]; // Apunta a tu archivo de rutas principal

swaggerAutogen(outputFile, endpointsFiles, doc);
