import { initTRPC } from '@trpc/server';
import { Context } from './context.js';

const t = initTRPC.context<Context>().create();
const publicProcedure = t.procedure;
export const appRouter = t.router({
	hello: publicProcedure.query((ctx) => {
		return {
			message: 'Hello World!',
		};
	}),
	allClasses: publicProcedure.query(async ({ ctx }) => {
		try {
			const classes = await ctx.prisma.class.findMany({});
			return classes;
		} catch (error) {
			console.error(error);
			return [];
		}
	}),
});

export type AppRouter = typeof appRouter;
