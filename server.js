const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const routes = require("./routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// MIDDLEWARES
app.use(express.json()); // ¡Asegúrate de tener esta línea antes de las rutas!
app.use(cors());

// Routes
app.use("/", routes);

//Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB Atlas: dulezzuabakery");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error de conexión:", err);
  });
