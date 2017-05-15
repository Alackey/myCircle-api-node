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
    req.body.privateVis,
    req.body.groupPage,
    req.body.photoUrl,
    req.body.backgroundPhotoUrl,
    req.body.description,
    req.body.notificationsId,
    req.body.eventsId,
    req.body.category,
    req.body.type,
    req.body.officialClub,
    req.body.discoverable
  );
  console.log(group);
  res.json({ hello: group });
};

