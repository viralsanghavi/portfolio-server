import express, {Router} from "express";
import serverless from "serverless-http";

const api = express();

import admin from "firebase-admin";

const fs = require("fs");

// Read the JSON file
// const data = fs.readFileSync("../cert.json", "utf8");
var serviceAccount = require("../cert.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const router = Router();

router.get("/hello", async (req, res) => {
  const snapshot = await db.collection("projects").get();
  let projectsArr = [];
  snapshot.forEach((doc) => {
    projectsArr.push(doc.data());
  });

  res.send(projectsArr);
});

api.use("/api/", router);

router.get("/sss", (req, res) => {
  res.json({
    hello: "hi!",
  });
});

// Use the router to handle requests to the `/.netlify/functions/api` path
app.use(`/.netlify/functions/api`, router);

// Export the app and the serverless function
module.exports = app;
module.exports.handler = serverless(app);
