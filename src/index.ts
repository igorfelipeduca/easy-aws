import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config";
import { User } from "./entities/user";
import * as dotenv from "dotenv";

dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(express.json());

    const userRepository = AppDataSource.getRepository(User);

    // Create a new user
    app.post("/users", async (req, res) => {
      const { name, email } = req.body;

      const newUser = new User();
      newUser.name = name;
      newUser.email = email;

      await userRepository.save(newUser);

      res.status(201).send(newUser);
    });

    // Read all users
    app.get("/users", async (req, res) => {
      const users = await userRepository.find();

      res.send(users);
    });

    // Read one user
    app.get("/users/:id", async (req, res) => {
      const user = await userRepository.findOneBy({
        id: parseInt(req.params.id),
      });

      if (!user) {
        res.status(404).send({ message: "User not found" });
      }

      res.send(user);
    });

    // Update a user
    app.put("/users/:id", async (req, res) => {
      const user = await userRepository.findOneBy({
        id: parseInt(req.params.id),
      });

      if (!user) {
        res.status(404).send({ message: "User not found" });
      }

      if (user) {
        const { name, email } = req.body;
        user.name = name;
        user.email = email;
        await userRepository.save(user);
        res.send(user);
      }
    });

    // Delete a user
    app.delete("/users/:id", async (req, res) => {
      const user = await userRepository.findOneBy({
        id: parseInt(req.params.id),
      });

      if (user) {
        await userRepository.remove(user);
        res.status(204).send();
      }

      res.status(404).send({ message: "User not found" });
    });

    app.listen(process.env.SERVER_PORT, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => console.log(error));
