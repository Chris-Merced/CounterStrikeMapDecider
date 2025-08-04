const friends = require("./friends.json");
const maps = require("./maps.json");

function main() {
  try {
    let trimmed = "default";

    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    console.log(" ------------------------------------");
    console.log("| Counter Strike Map List Generator  |");
    console.log(" ------------------------------------");
    displayMenu();

    process.stdin.on("data", (input) => {
      trimmed = input.trim();

      switch (trimmed) {
        case "3":
          process.exit();
        default:
          console.log(trimmed);
          break;
      }
    });

    process.stdin.on("error", (err) => {
      console.log("A huge ooopsie poopsie has occured");
      console.error(err);
    });
  } catch (err) {
    console.log("A major oopsie poopsie has occured");
    console.log(err);
    process.resume();
  }

  process.on("uncaughtException", (err) => {
    console.log("Big oopsie poopsie happened!");
    console.log(err);
  });
}

function displayMenu() {
  console.log("");
  console.log("Select Your Option: ");
  console.log("1. Generate List");
  console.log("2. Modify Map Preferences");
  console.log("3. Exit");
  console.log("");
}

main();
