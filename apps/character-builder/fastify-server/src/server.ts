import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import Fastify from 'fastify';
import { appRouter } from './router.js';
import { createContext } from './context.js';

const server = Fastify({ logger: true });
const HOST = 'RENDER' in process.env ? '0.0.0.0' : 'localhost';
let PORT: number;

if (process.env.PORT) {
	PORT = parseInt(process.env.PORT);
} else {
	PORT = 8000;
}

server.register(fastifyTRPCPlugin, {
	prefix: '/trpc',
	trpcOptions: { router: appRouter, createContext },
});

export async function startServer() {
	try {
		await server.listen({ port: PORT, host: HOST });
		server.log.info(`Server Started on port ${PORT}`);
	} catch (error) {
		console.error('ERROR:', error);
		process.exit(2);
	}
}
