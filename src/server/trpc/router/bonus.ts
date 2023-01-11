import { router, protectedProcedure } from "../trpc";

export const bonusRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.bonus.findMany({
      include: {
        bonusType: true, // Return all fields
      },
    });
  }),
  getAllTypes: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.bonusType.findMany();
  }),
});
