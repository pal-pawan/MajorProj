import * as z from 'zod';

export const roleOverviewSchema = z.object({
    role: z.string().min(1, "this field must not be empty")
});