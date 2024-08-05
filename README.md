# PMS

The Prompt Management Application is a full-stack web application designed to facilitate the creation, management, and organization of writing prompts.

### Install Dependencies

To install packages, run the following command:

```
cd pms-frontend
corepack enable
pnpm install
```

### Update Swagger

When BE have changes related to Swagger. You need to make sure BE's running locally and run these commands:

```
cd pms-frontend
pnpm generate:swagger
pnpm build:packages
```

### Build

To build all apps and packages, run the following command:

```
cd pms-frontend
pnpm build:packages
pnpm build:web
```

### Develop

To develop all apps and packages, run the following command:

```
cd pms-frontend
pnpm build:packages
pnpm dev:web
```
