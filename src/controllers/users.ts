import { Request, Response } from "express";
import { User } from "../models/User";
import { DBConnection } from "../database/cloudsql";


/**
 * GET /
 * Get a user but username.
 */
export let getByUsername = (req: Request, res: Response) => {
  const username = req.query.username;
  if (username === undefined) {
    res.status(400).json({ error: "No username provided" });
    return;
  }

  const connection = DBConnection.Instance;
  connection.getByPrimary("users", username)
    .then((response) => {
      if (response === undefined) {
        res.status(400).json({ error: "User not found" })
      }
      res.send(response);
    });
};

/**
 * POST /
 * Create a user.
 */
export let create = (req: Request, res: Response) => {
  const connection = DBConnection.Instance;
  const user = new User(
    req.body.username,
    req.body.photoUrl,
    req.body.firstname,
    req.body.lastname,
    req.body.email
  );

  connection.insert(user)
    .then((response) => {
      res.json({ status: "success" });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

