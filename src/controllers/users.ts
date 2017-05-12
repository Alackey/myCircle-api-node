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
    res.json({ error: "No username provided" });
  }

  const connection = DBConnection.Instance;
  connection.getByPrimary("users", username)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
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
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(JSON.stringify(user));
  res.json({ hello: user });
};

