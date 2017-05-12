import { Request, Response } from "express";
import { User } from "../models/User";
import { DBConnection } from "../database/cloudsql"

/**
 * GET /
 * Home page.
 */
export let create = (req: Request, res: Response) => {
  let connection = DBConnection.Instance;
  let user = new User(
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

