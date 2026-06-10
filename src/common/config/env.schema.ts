import z from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  API_KEY: z.string().min(1),
});

export default envSchema;
