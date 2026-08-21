import readline from "node:readline";
import bcrypt from "bcryptjs";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question("Enter the admin password to hash: ", async (password) => {
  if (!password || password.length < 10) {
    console.error("Password must be at least 10 characters.");
    rl.close();
    process.exit(1);
  }
  const hash = await bcrypt.hash(password, 12);
  console.log("\nBcrypt hash:\n" + hash);
  console.log("\nCopy this hash into ADMIN_PASSWORD_HASH in server/.env");
  rl.close();
});
