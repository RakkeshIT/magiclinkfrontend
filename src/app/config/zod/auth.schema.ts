import z from "zod";

export const authSchema = z.object({
    email: z.email()
})

export type AuthDataType = z.infer<typeof authSchema>
