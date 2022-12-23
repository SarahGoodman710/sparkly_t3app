import { router, protectedProcedure } from "../trpc";

export const employeeRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.employee.findMany();
  }),
});
