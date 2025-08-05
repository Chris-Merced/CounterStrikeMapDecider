async function askUser(prompt = "") {
  process.stdout.write(prompt);
  return new Promise((resolve) => {
    process.stdin.once("data", (input) => resolve(input.toString().trim()));
  });
}

module.exports = askUser;
