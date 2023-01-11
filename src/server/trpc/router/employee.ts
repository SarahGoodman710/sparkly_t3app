import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

const defaultPostSelect = {
  EmployeeId: true,
  FirstName: true,
  LastName: true,
};

export const employeeRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.employee.findMany({
      select: defaultPostSelect,
    });
  }),
  add: protectedProcedure
    .input(
      z.object({
        EmployeeId: z.string(),
        FirstName: z.string(),
        LastName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.employee.create({
        data: input,
        select: defaultPostSelect,
      });
      return post;
    }),
  update: protectedProcedure
    .input(
      z.object({
        EmployeeId: z.string(),
        FirstName: z.string(),
        LastName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { EmployeeId, ...rest } = input;

      const post = await ctx.prisma.employee.update({
        where: { EmployeeId },
        data: { ...rest },
        select: defaultPostSelect,
      });

      return post;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        EmployeeId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.employee.delete({
        where: {
          EmployeeId: input.EmployeeId,
        },
        select: defaultPostSelect,
      });

      return post;
    }),
});
