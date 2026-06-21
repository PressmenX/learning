import z from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  API_KEY: z.string().min(1),
  MAX_CONTACT_PER_USER: z.coerce.number(),
});

export default envSchema;
