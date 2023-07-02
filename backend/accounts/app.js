const cors = require("cors"),
	express = require("express"),
	morgan = require("morgan"),
	helmet = require("helmet"),
	cookieParser = require("cookie-parser"),
	csurf = require("@dr.pogodin/csurf"),
	routes = require("./src"),
	{ map } = require("p-iteration"),
	db = require("./db/models"),
	{ ValidationError } = require("sequelize"),
	{ environment, port } = require("./config");

const app = express();
const isProduction = environment === "production";

if (!isProduction) app.use(cors());

app.use(cookieParser());
app.use(express.json());

helmet.crossOriginResourcePolicy({
	policy: "cross-origin",
});

app.use(
	csurf({
		cookie: {
			secure: isProduction,
			sameSite: isProduction && "Lax",
			httpOnly: true,
		},
	})
);

app.use(routes);

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
	const err = new Error("The requested resource couldn't be found.");
	err.title = "Resource Not Found";
	err.errors = ["The requested resource couldn't be found."];
	err.status = 404;
	next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
	// check if error is a Sequelize error:
	if (err instanceof ValidationError) {
		err.errors = err.errors.map((e) => e.message);
		err.title = "Validation error";
	}
	next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
	res.status(err.status || 500);
	res.json({
		title: err.title || "Server Error",
		message: err.message,
		errors: err.errors,
		stack: isProduction ? null : err.stack,
	});
});

module.exports = app;
