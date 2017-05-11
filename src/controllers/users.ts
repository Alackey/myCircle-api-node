import { Request, Response } from "express";
import { User } from "../models/User";

/**
 * GET /
 * Home page.
 */
export let create = (req: Request, res: Response) => {
  let user = new User(
    req.body.uid,
    req.body.username,
    req.body.photo,
    req.body.firstname,
    req.body.lastname,
    req.body.email
  );
  console.log(user);
  res.json({ hello: user });
};

