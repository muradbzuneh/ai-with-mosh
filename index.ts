import concurrently from "concurrently";

concurrently([
  {
    name: "server",
    command: "bun run dev",
    cwd: "app/server",
    prefixColor: "blue",
    raw: true
  },
  {
    name: "client",
    command: "bun run dev",
    cwd: "app/client",
    prefixColor: "green",
    raw: true
  }
]);