import { router, publicProcedure } from "../trpc";

export const employeeRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.employee.findMany();
  }),
});
