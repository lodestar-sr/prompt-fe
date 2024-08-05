import { createClient } from '@hey-api/openapi-ts';

if (process.env.SWAGGER_URL) {
  createClient({
    client: '@hey-api/client-axios',
    input: process.env.SWAGGER_URL,
    output: {
      path: 'src',
      format: 'prettier',
      lint: 'eslint',
    },
  });
} else {
  throw new Error("SWAGGER_URL doesn't exist in process.env");
}
