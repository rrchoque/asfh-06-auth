import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";

const privateRoutes = ["/protected"];
// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((context, next) => {
  const { url, request } = context;

  return next();
});
