import fastify from "fastify";
import { say } from "cowsay";

const app = fastify({ logger: true });

app.get("/", async (_request, _reply) => {
  return say({ text: "Hello World" });
});

app.listen({ host: "0.0.0.0", port: 8080 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server ready at ${address}`);
});
