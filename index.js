const maps = require("./src/data/maps.json");
const addDeleteFriends = require("./menuOptions/addDeleteFriends");
const askUser = require("./input");

async function main() {
  try {
    let trimmed = "default";

    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    console.log(" ------------------------------------");
    console.log("| Counter Strike Map List Generator  |");
    console.log(" ------------------------------------");
    let running = true;

    while (running) {
      displayMenu();

      let choice = await askUser();

      switch (choice) {
        case "3":
          await addDeleteFriends.options();
          break;
        case "4":
          process.exit();
          break;
        default:
          console.log(
            "Please Select a Menu Option by pressing a number then Enter",
          );
          break;
      }
    }
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
  console.log("3. Add/Delete Friends");
  console.log("4. Exit");
  console.log("");
}

main();
