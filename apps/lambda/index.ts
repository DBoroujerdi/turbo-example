import type { SQSHandler } from "aws-lambda";
import { say } from "cowsay";

const handler: SQSHandler = async (_event) => {
  console.log(say({ text: "Hello World" }));
};

export { handler };
