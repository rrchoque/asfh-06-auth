import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { firebase } from "@/firebase/config";
import { createUserWithEmailAndPassword, type AuthError } from "firebase/auth";

export const registerUser = defineAction({
  accept: "form",
  input: z
    .object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(6),
      confirmPassword: z.string().min(6),
      remember_me: z.boolean().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
    }),
  handler: async ({ name, password, remember_me, email }, context) => {
    const { cookies } = context;
    //console.log({ name, password, remember_me, email });
    // cookies
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

    // Creación de usuarios
    try {
      const user = await createUserWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );

      //console.log({ user });
      // Actualizar el nombre del usuario

      // Verificar el correo electrónico

      //return user;
      return {
        uid: user.user.uid,
        email: user.user.email,
      };
    } catch (error) {
      console.log({ error });

      const firebaseError = error as AuthError;

      if (firebaseError.code === "auth/email-already-in-use") {
        throw new Error("El correo electrónico ya está en uso");
      }

      throw new Error("Algo salio mal al registrar el usuario");
    }

    //return { ok: true, msg: "Usuario registrado" };
  },
});
