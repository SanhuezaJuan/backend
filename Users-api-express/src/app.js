import express from "express";
import dotenv from "dotenv";
dotenv.config();
import session from "express-session";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import { controllers } from "./controllers/controllers.js";
import { services } from "./services/services.js";
import { connect } from "./connectDb/conection.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import cors from "cors";
import { rutas } from "./routes/routes.js";
import { v4 as uuidv4 } from "uuid";
import { ensureLogin } from "./middlewaresConnect/ensureLogin.js";
const PORT = Number(process.env.PORT);
const { SearchUserByID, SearchUserByUsername } = controllers;
const { compareHashPass } = services;
const app = express();

app.set("trust proxy", true);
// solucion a los cors (Cross-Origin Resource Sharing)
app.use(cors());
//session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,

    genid: function (req) {
      return uuidv4();
    },
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },

    rolling: true,
  })
);

// metodos para poder formatear el cuerpo segun lo que envian
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.disable("x-powered-by");
// inicializacion de passport
app.use(passport.initialize());
app.use(passport.session());

//serializacion y deserializacion de passport

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    let user = await SearchUserByID(id, true);
    if (!user) return done(null, false);

    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
});

// estrategia local

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      let user = await SearchUserByUsername(username);
      if (!user)
        return done(null, false, { message: "Credenciales incorrectas" });

      let pass = await compareHashPass(password, user.password);

      if (!pass)
        return done(null, false, { message: "Credenciales incorrectas" });

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);

// estrategia jwt

let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.Access_Token_Secret,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      console.log(jwt_payload.sub);
      let id = jwt_payload.sub;
      let user = await SearchUserByID(id, true);

      // el tercer parametro de done se incluira en el objeto info.
      return done(null, user, { token: jwt_payload });
    } catch (err) {
      return done(err, false);
    }
  })
);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Application listening on http://localhost:${PORT}`);
});

// coneccion a la base de datos
connect(process.env.URL_DB)
  .then(() => console.log("base de datos conectada"))
  .catch((err) => console.log(err));

//rutas de la app

app.use("/api/v1", rutas.appRegister);
app.use("/api/v1", rutas.appLogin);
app.use("/api/v1", rutas.appFailedLogin);
app.use("/api/v1", rutas.appConfirm);
app.get("/api/v1/logout", (req, res) => {
  return req.logOut(() => {
    res.status(400).json({
      msg: "El usuario a cerrado la session",
      Authenticate: false,
    });
  });
});

app.get(
  "/prueba2",
  (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (error, user, info) => {
      if (error || !user)
        return res.status(400).json({
          msg: "User not found or an error ocurred",
          code: 400,
        });

      if (!info.token.accesMaterial)
        return res.status(400).json({
          msg: "You do not have access to the url",
        });

      next();
    })(req, res, next);
  },
  (req, res) => {
    res.json({
      msg: "Hello Friend",
      otherMsg: req.isAuthenticated(),
    });
  }
);

app.get("/prueba", ensureLogin("/fallo"), (req, res) => {
  res.json({
    msg: "Session iniciada",
  });
});

app.get("/fallo", (req, res) => {
  res.status(400).json({
    msg: "La session no esta iniciada",
  });
});
// para rutas inexistentes
app.all("*", (req, res) => {
  res.status(404).json({
    code: 404,
    msg: "Route not found",
  });
});
