import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import Fastify from 'fastify';
import { appRouter } from './router';
import { createContext } from './context';

const server = Fastify({ logger: true });
const PORT = 8000;

server.register(fastifyTRPCPlugin, {
	prefix: '/trpc',
	trpcOptions: { router: appRouter, createContext },
});

export async function startServer() {
	try {
		await server.listen({ port: PORT });
		server.log.info(`Server Started on port ${PORT}`);
	} catch (error) {
		console.error('ERROR:', error);
		process.exit(2);
	}
}
