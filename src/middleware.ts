import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";
import { firebase } from "./firebase/config";

const privateRoutes = ["/protected"];
// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((context, next) => {
  const { url, request, locals, redirect } = context;

  const user = firebase.auth.currentUser;
  const isLoggedIn = !!user;

  locals.isLoggedIn = isLoggedIn;

  if (user) {
    locals.user = {
      avatar: user.photoURL ?? "",
      email: user.email!,
      name: user.displayName ?? "No display Name",
      emailVerified: user.emailVerified,
    };
  }

  return next();
});
