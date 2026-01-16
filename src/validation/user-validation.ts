import z from "zod";

export default class UserValidation {
  static readonly EDITSCHEMA = z.object({
    username: z.string({ error: "Please fill username properly!" }),
    gender: z.enum(["UNKNOWN", "MALE", "FEMALE"], {
      error: "Please fill gender just between Unknwon, Male, and Female",
    }),
    birthday: z.date({ error: "Please fill birthday properly!" }).optional(),
  });
}
