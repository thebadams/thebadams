import { FastifyInstance } from "fastify";

export type RegisterFastifyServerFunction = () => Promise<FastifyInstance>;

export async function bootStrap(
  registerServer: RegisterFastifyServerFunction,
  port: number | string
) {
  try {
    const server = await registerServer();
    await server.listen(port);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
