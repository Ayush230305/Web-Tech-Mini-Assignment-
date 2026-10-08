const crypto = require("crypto");

const [, , command, ...args] = process.argv;

function toUpper(text) {
  return text.toUpperCase();
}

function factorial(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("Please enter a non-negative integer.");
  }
  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) result *= i;
  return result.toString();
}

function generatePassword(length = 12) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars[crypto.randomInt(chars.length)];
  }
  return password;
}

function showHelp() {
  console.log(`
Usage: node utility.js <command> [input]

Commands:
  upper <text>        Convert text to uppercase
  factorial <number>  Calculate factorial of a number
  password [length]   Generate a random password (default 12)
  help                Show this message
`);
}

try {
  switch (command) {
    case "upper":
      if (args.length === 0) throw new Error("Please provide some text.");
      console.log(toUpper(args.join(" ")));
      break;
    case "factorial":
      console.log(factorial(Number(args[0])));
      break;
    case "password":
      console.log(generatePassword(args[0] ? Number(args[0]) : 12));
      break;
    default:
      showHelp();
  }
} catch (err) {
  console.error("Error:", err.message);
}