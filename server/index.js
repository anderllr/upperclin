import express from "express";
import bodyParser from "body-parser";
import graphqlHTTP from "express-graphql";
import mongoose from "mongoose";
import cors from "cors";

import schema from "./src/graphql/schema";
import { db } from "./src/models";
import { tokenMiddleware } from "./src/utils/tokenMiddleware";
import { verifyAdmin } from "./src/utils/firstUser";

const DB_NAME = "upperclindb";

const MONGO_URI = `mongodb://localhost:27017/${DB_NAME}`;

mongoose.connect(
	MONGO_URI,
	{ useNewUrlParser: true }
);

const PORT = 3002;

const app = express();

//Middleware to put db in request and later in context
const dbRequest = (req, res, next) => {
	req["context"]["db"] = db;
	next();
};

verifyAdmin();

app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST"],
		allowedHeaders: ["Content-Type", "Authorization", "Accept-Enconding"],
		preflightContinue: false,
		optionsSuccessStatus: 204
	})
);

app.use(
	"/upperql",
	tokenMiddleware,
	dbRequest,
	bodyParser.json(),
	graphqlHTTP(req => ({
		schema: schema,
		graphiql: true,
		context: req["context"]
	}))
);

app.listen(PORT, () => console.log(`Server connected at port: ${PORT}`));
