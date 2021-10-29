
// Check if Dev token exists, is valid, and not expired
import { generateToken } from "../utils/token";
import fetch from 'isomorphic-unfetch'

// Fetch user token
// fetch last played track

type LastPlayedTrack = {
  title: string;
  artist: string;
  album: string;
  artwork:string;
  url: string;

}

export default async function NowPlaying() {
  try {
  const lastPlayedSong = await fetch('https://api.music.apple.com/v1/me/recent/played/tracks?types=songs&limit=1', {
    headers: {
      Authorization: `Bearer ${generateToken()}`,
      'Music-User-Token': process.env.MUSIC_USER_TOKEN},
  }).then(res => res.json());

  const { name, artistName, albumName, artwork, url }: {name: string, artistName: string, albumName: string, artwork: {url: string}, url: string} = await lastPlayedSong.data[0].attributes;
  const coverUrl = artwork.url.replace('{w}', '300').replace('{h}', '300');

  const lastPlayed: LastPlayedTrack = {"artist": artistName, "title": name, "album": albumName, "artwork": coverUrl, "url": url}
  return {lastPlayed}}
  catch(err) {
    console.error(err);
    return {error: "Internal Server Error", statusCode: 500, message: err.message};
  }
}
