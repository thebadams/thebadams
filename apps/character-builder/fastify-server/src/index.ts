import Fastify from 'fastify';

const app = Fastify({ logger: true });
const PORT = 8000;
app.get('/', (req, res) => {
	return { msg: 'Hello World' };
});

try {
	await app.listen({ port: PORT });
	console.log(`Listening on Port ${PORT}`);
} catch (error) {
	console.error(error);
	process.exit(1);
}
