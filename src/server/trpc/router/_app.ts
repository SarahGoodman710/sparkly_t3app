import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { employeeRouter } from "./employee";
import { businessRouter } from "./business";
import { bonusRouter } from "./bonus";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  employee: employeeRouter,
  business: businessRouter,
  bonus: bonusRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
