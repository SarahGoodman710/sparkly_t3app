import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const defaultPostSelect = Prisma.validator<Prisma.PostSelect>()({
  EmployeeId: true,
  FirstName: true,
  LastName: true,
});

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
});
