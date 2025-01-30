import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { firebase } from "@/firebase/config";
import { signInWithEmailAndPassword, type AuthError } from "firebase/auth";

export const loginUser = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ password, remember_me, email }, context) => {
    const { cookies } = context;

    // Login con firebase
    try {
      const user = await signInWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );

      // Guardar cookie si el login fue correcto
      if (remember_me) {
        cookies.set("email", email, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 año,
          path: "/",
        });
      } else {
        cookies.delete("email", {
          path: "/",
        });
      }

      return {
        uid: user.user.uid,
        email: user.user.email,
      };
    } catch (error) {
      console.log({ error });
      throw new Error("Los datos son incorrectos");
    }

    //return { ok: true, msg: "Usuario registrado" };
  },
});
