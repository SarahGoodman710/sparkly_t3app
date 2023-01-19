import { router, protectedProcedure } from "../trpc";

const defaultPostSelect = {
  TipTypeId: true,
  TipTypeKey: true,
  Description: true,
};

export const tipTypeRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.tipType.findMany({
      select: defaultPostSelect,
    });
  }),
});
