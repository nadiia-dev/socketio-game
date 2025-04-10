import { Server } from "socket.io";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());

const API_URL = process.env.API_URL;
const CLIENT_ID = process.env.GITHUB_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_OAUTH_CLIENT_SECRET;

app.get("/auth/github", (req, res) => {
  const redirect_uri = `${API_URL}/auth/github/callback`;
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}`
  );
});

app.get("/auth/github/callback", async (req, res) => {
  const { code } = req.query;

  const tokenResponse = await axios.post(
    `https://github.com/login/oauth/access_token`,
    {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
    },
    {
      headers: { Accept: "application/json" },
    }
  );

  const access_token = tokenResponse.data.access_token;

  const userResponse = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `token ${access_token}`,
    },
  });

  const username = userResponse.data.login;

  res.redirect(`${API_URL}?username=${username}`);
});

app.use(express.static(__dirname + "/public"));
const expressServer = app.listen(9000);
console.log("app listening to port 9000");

export const io = new Server(expressServer);
