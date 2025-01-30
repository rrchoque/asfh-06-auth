import { defineAction } from "astro:actions";
import { z } from "astro:schema";

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
    console.log({ name, password, remember_me, email });

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

    return { ok: true, msg: "Usuario registrado" };
  },
});
