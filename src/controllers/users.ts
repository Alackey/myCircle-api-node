import { Request, Response } from "express";
import { User } from "../models/User";
import { DBConnection } from "../database/cloudsql";


/**
 * GET /
 * Get a user but username.
 */
export let getByUsername = (req: Request, res: Response) => {
  const { username } = req.query;
  if (username === undefined) {
    return res.status(400).json({ error: "No username provided" });
  }

  const connection = DBConnection.Instance;
  connection.getByPrimary("users", username)
    .then((response) => {
      if (response === undefined) {
        return res.status(400).json({ error: "User not found" });
      }
      res.json({ status: "success" });
    }).catch((err) => {
      res.status(400).json({ error: err });
    });
};

/**
 * POST /
 * Create a user.
 */
export let create = (req: Request, res: Response) => {
  const connection = DBConnection.Instance;
  const { username, photoUrl, firstname, lastname, email } = req.body;
  const user = new User(username, photoUrl, firstname, lastname, email);

  connection.insert(user)
    .then((response) => {
      res.json({ status: "success" });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

/**
 * DELETE /
 * Delete a user.
 */
export let deleteUser = (req: Request, res: Response) => {
  const { username } = req.query;
  if (username === undefined) {
    return res.status(400).json({ error: "No username provided" });
  }

  const connection = DBConnection.Instance;
  connection.deleteByPK("users", username)
    .then((response) => {
      if (response === undefined) {
        return res.status(400).json({ error: "User not found" });
      }
      res.json({ status: "success" });
    }).catch((err) => {
      res.status(400).json({ error: err });
    });
};

