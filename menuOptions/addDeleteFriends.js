const friends = require("../src/data/friends.json");
const askUser = require("../input");

async function options() {
  return new Promise(async (resolve) => {
    let trimmed = null;
    try {
      let running = true;

      while (running) {
        let choice = await askUser(
          "Select [A]dd Friend, [D]elete Friend or [E]xit \n",
        );

        switch (choice) {
          case "A":
            await addFriend();
            resolve();
            return;
            break;
          case "D":
            await deleteFriend();
            resolve();
            return;
            break;
          case "E":
            resolve();
            return;
            break;
          default:
            console.log(
              "Please select [A]dd Friend, [D]elete Friend or [E]xit \n",
            );
            break;
        }
      }
    } catch (err) {
      console.log("Error choosing Add/Delete Friend: " + err.message);
      resolve();
    }
  });
}

async function addFriend() {
  let friend = await askUser("Input friend name: ");
  let correct = false;
  return new Promise(async (resolve) => {
    try {
      while (!correct) {
        const verification = await askUser(
          `${friend} - Is this correct? (Y/N)`,
        );

        switch (verification) {
          case "Y":
            //add friend
            resolve();
            correct = true;
            break;
          case "N":
            friend = await askUser("Input friend name: ");
            break;
          default:
            console.log("Please Enter [Y]es or [N]o");
            break;
        }
      }
    } catch (err) {
      console.log("Error adding friend: " + err.message);
      return;
    }
  });
}

async function verifyAddInput(friend) {
  let choice = null;

  process.stdin.once("data", (input) => {
    choice = input.trim();

    try {
      switch (choice) {
        case "Y":
          console.log("Friend has been added");
          //add to friends
          break;
        case "N":
          addFriend();
          break;
        default:
          console.log("Please Select an Option by Entering Y or N then Enter");
      }
    } catch (err) {
      console.log("Error in Verifying user input: " + err.message);
      options();
    }
  });
}

async function deleteFriend() {}

module.exports = { options, addFriend, deleteFriend };
