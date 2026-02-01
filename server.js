const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const routes = require("./routes");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);

//Initialize
app.use(passport.initialize());
app.use(passport.session());

// Configurate GitHub strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      // Now, only pass user profile
      return done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes
app.get("/login", passport.authenticate("github", { scope: ["user:email"] }));

// Ruote to callback (where GitHub will return you)
app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: true,
  }),
  (request, response) => {
    request.session.user = request.user;
    response.redirect("/api-docs");
  },
);

// Routes to close session
app.get("/logout", function (request, response, next) {
  request.logout(function (err) {
    if (err) {
      return next(err);
    }
    response.redirect("/api-docs");
  });
});

// Simple route to verify the state on the browser
app.get("/", (request, response) => {
  response.send(
    request.session.user !== undefined
      ? `Logged in as ${request.session.user.displayName}`
      : "Logged Out",
  );
});

// General route
app.use("/", routes);

//Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Drive global errors
app.use((err, request, response, next) => {
  console.error(err.stack);
  response.status(err.status || 500).json({
    message: err.message || "Something went wronge on the Dulezzua server",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

// Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected MongoDB Atlas: dulezzuabakery");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error de conexión:", err);
  });
