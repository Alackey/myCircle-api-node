import { Request, Response } from "express";
import { Group } from "../models/Group";

/**
 * GET /
 * Home page.
 */
export let create = (req: Request, res: Response) => {
  let group = new Group(
    req.body.id,
    req.body.name,
    req.body.private_visibility,
    req.body.members,
    req.body.photo,
    req.body.background_photo,
    req.body.description,
    req.body.notifications,
    req.body.events,
    req.body.category,
    req.body.type,
    req.body.official_club
  );
  console.log(group);
  res.json({ hello: group });
};

