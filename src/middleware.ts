import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";
import { firebase } from "./firebase/config";

const privateRoutes = ["/protected"];
const notAuthenticatedRoutes = ["/login", "/register"];

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

  if (!isLoggedIn && privateRoutes.includes(url.pathname)) {
    return redirect("/");
  }

  if (isLoggedIn && notAuthenticatedRoutes.includes(url.pathname)) {
    return redirect("/");
  }

  return next();
});
