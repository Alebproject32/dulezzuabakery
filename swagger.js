const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "DulezzuaBakery API",
    description:
      "API for managing cakes and bakery products with API from BYU Pathway Worldwide course CSE341",
    version: "1.0.0",
  },
  host: "dulezzuabakery.onrender.com",
  basePath: "/",
  schemes: ["https"],
  securityDefinitions: {
    github_auth: {
      type: "oauth2",
      authorizationUrl: "https://dulezzuabakery.onrender.com/github/callback",
      flow: "implicit",
      scopes: {
        read: "Read access",
        write: "Write access",
      },
    },
  },
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
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
