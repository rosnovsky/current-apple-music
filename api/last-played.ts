import {VercelRequest, VercelResponse } from "@vercel/node";
import { renderToString } from "react-dom/server";
import { Player } from "../components/LastPlayed";
import nowPlaying from "./music";

export default async function (req: VercelRequest, res: VercelResponse) {
  const {lastPlayed} = await nowPlaying()

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

  const { title: track, artwork } = lastPlayed;

  let coverImg = null;
  if (artwork) {
    const buff = await (await fetch(artwork)).arrayBuffer();
    coverImg = `data:image/jpeg;base64,${Buffer.from(buff).toString("base64")}`;
  }

  const artist = (lastPlayed.artist);
  const text = renderToString(
    Player({ cover: coverImg, artist, track })
  );
  return res.status(200).send(text);
}
