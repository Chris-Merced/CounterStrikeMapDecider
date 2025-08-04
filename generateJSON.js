const fs = require("fs");
const maps = [
  "Ancient",
  "Dust II",
  "Inferno",
  "Mirage",
  "Nuke",
  "Overpass",
  "Train",
];

const mapsData = JSON.stringify(maps);

const friends = [
  "Yak",
  "Chandler",
  "Tyler",
  "Brandon",
  "Chris",
  "Josh",
  "Jin",
  "Tim",
  "Mossburg",
];

friends.sort();

const friendsData = JSON.stringify(friends);

fs.writeFileSync("maps.json", mapsData);
fs.writeFileSync("friends.json", friendsData);

console.log("Files written sucessfully");
