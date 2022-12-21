import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { employeeRouter } from "./employee";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  employee: employeeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
