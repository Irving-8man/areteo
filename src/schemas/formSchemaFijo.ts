import { z } from "zod";

export const scoresArea1Schema = z.object({
    q1: z.number().min(0).max(11),
    q2: z.number().min(0).max(11),
    q3: z.number().min(0).max(11),
    q4: z.number().min(0).max(11),
    q5: z.number().min(0).max(11),
    q6: z.number().min(0).max(11)
});
