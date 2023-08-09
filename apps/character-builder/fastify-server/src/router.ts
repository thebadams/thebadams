import { initTRPC } from '@trpc/server';

const t = initTRPC.create();
const publicProcedure = t.procedure;
export const appRouter = t.router({
	hello: publicProcedure.query((ctx) => {
		return {
			message: 'Hello World!',
		};
	}),
});

export type AppRouter = typeof appRouter;
