import jaspreetPhoto from "../customs/JASPREET PREETI.jpeg";
import juneetPhoto from "../customs/JUNEET PAL SINGH.jpeg";
import lovepreetPhoto from "../customs/LOVEPREET.jpeg";
import mahaveerPhoto from "../customs/MAHAVEER.jpeg";

function normalizeName(name) {
  return name
    .trim()
    .replace(/\./g, "")
    .replace(/\s+/g, " ")
    .toUpperCase();
}

const photosByName = {
  [normalizeName("PROF. MS. JASPREET PREETI SHAHID")]: jaspreetPhoto,
  [normalizeName("S. LOVEPREET")]: lovepreetPhoto,
  [normalizeName("MR. MAHAVEER")]: mahaveerPhoto,
  [normalizeName("S. JUNEET PAL SINGH")]: juneetPhoto,
};

export function getLeadershipPhoto(name) {
  if (!name) return null;
  return photosByName[normalizeName(name)] ?? null;
}
