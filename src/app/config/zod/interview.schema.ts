import z from 'zod'

export const interviewSchema = z.object({
    role: z.string().min(1, "Role is Required"),
    experience: z.string().min(1, "Experience is Required"),
    difficulty: z.enum([
        "Easy",
        "Medium",
        "Hard",
      ]),
    numberOfQuestions: z.number().min(1).max(25)
})

export type interviewData = z.infer<typeof interviewSchema>