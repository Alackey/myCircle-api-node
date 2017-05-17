import { Request, Response } from "express";
import { Group } from "../models/Group";

/**
 * GET /
 * Home page.
 */
export let create = (req: Request, res: Response) => {
  const { id, name, privateVis, groupPage, photoUrl, backgroundPhotoUrl, description, notificationsId, eventsId,
          category, type, officialClub, discoverable } = req.body;
  const group = new Group(
      id,
      name,
      privateVis,
      groupPage,
      photoUrl,
      backgroundPhotoUrl,
      description,
      notificationsId,
      eventsId,
      category,
      type,
      officialClub,
      discoverable
  );
  console.log(group);
  res.json({ hello: group });
};

