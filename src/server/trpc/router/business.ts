import { router, protectedProcedure } from "../trpc";

const defaultPostSelect = {
  BusinessId: true,
  BusinessKey: true,
  Description: true,
};

export const businessRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.business.findMany({
      select: defaultPostSelect,
    });
  }),
});
