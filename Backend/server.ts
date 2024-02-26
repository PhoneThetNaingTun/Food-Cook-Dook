import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import fs from "fs";
import jwd from "jsonwebtoken";
import cors from "cors";
import bodyParser from "body-parser";
import { menus } from "./Data/menu";
import { Message } from "@mui/icons-material";
const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const allMenus = menus;

let users: { email: string; password: string }[] = [];
try {
  const userData = fs.readFileSync("./Data/users.json", "utf-8");
  users = JSON.parse(userData);
} catch (error) {
  users = [];
}
app.post("/signup", (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and Password are required");
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const newUser = { email, password: hash };
  users.push(newUser);
  fs.writeFileSync("./Data/users.json", JSON.stringify(users, null, 2));
  res.status(201).send({ email });
});

app.post("/signin", (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).send("Email and Password are required");
  }

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(401).send("User Not Found");
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);

  if (!passwordMatch) {
    return res.status(401).send("Password Unmatch");
  }

  const token = jwd.sign({ email }, "sKSDoei234IDSa", { expiresIn: "1hr" });
  res.status(200).send({ token });
});

app.get("/menus", (req: Request, res: Response) => {
  res.send(allMenus);
});

app.post("/menus", (req: Request, res: Response) => {
  const { name, price } = req.body;
  const id = allMenus.length + 1;
  const newMenu = { id, name, price };
  if (!name || !price) {
    res.send({ Message: "notok" });
  }
  allMenus.push(newMenu);
  res.send({ Message: "ok" });
});

app.listen(PORT, () => console.log(PORT));
