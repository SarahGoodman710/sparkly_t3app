import { router, protectedProcedure } from "../trpc";

export const businessRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.business.findMany();
  }),
});
