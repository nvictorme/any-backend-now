# any-backend-now

Clean, simple, agnostic REST API scaffold; built with TypeScript, Express, Passport, JWT, Redis, TypeORM and all the good stuff.

Have a brilliant idea? Building a new project?
Don't re-invent the wheel everytime!

any-backend-now includes out-of-the-box:
- Environment management
- CORS handling and secure headers (cors, helmet)
- Support for JSON and Form-URL-Encoded bodies
- Logging (morgan)
- BaseEntity Class you can use to extend your TypeORM models. (Keep it D.R.Y)
- Authentication & Authorization with Passport Local & JWT strategies
- Uses Redis as in-memory store for the refresh tokens
- AWS and Sendgrid integration
- Dockerimage file for when you're ready to build for production (optional)
- Swagger UI for OpenAPI Docs

Notes:
- TypeORM is set to use MySQL, but you can change it to PostgreSQL, Mongo, etc.
- You can turn it into an SSR app if you wanted to; just add a template engine, some views, public folder, and you got yourself a web app.

## How to run?

### Pre-requisites
- (Recommended, optional) Node 18
- PM2, install with: `npm i pm2 -g`

### Development

1. Edit `./ecosystem.config.js` and set your development environment variables under `env`.
2. install dependencies with `npm install`
3. open a 1st terminal and run `npm run build:dev`. This will execute the typescript compiler in `watch mode`.
4. open a 2nd terminal and run `npm run start:dev`. This will start the app with pm2. It will reload on file change.

### Production

#### Using PM2 (preferred)
1. Edit `./ecosystem.config.js` and set your development environment variables under `env_production`.
2. Compile the project using `npm run build`;
3. Run with `npm start`.
#### Updating Environment Variables in Production
You can update environment variables by editing `./ecosystem.config.js`
and then using `npm run reload` to inject them in your pm2 process;
thus minimizing downtime.

#### Using Docker (optional)
1. Edit `./ecosystem.config.js` and set your development environment variables under `env_production`.
2. build docker image with: `docker build -t some-image-name:tag .` (the dot `.` means the root folder of your project)
3. run docker container with: `docker run --name some-container-name -p local_port:3000 -d some-image-name:tag`

## Swagger UI 

Edit the swagger file `/src/swagger.json`. 
API docs found at `localhost:3000/api-docs/`.



**Fun, fast and easy** :)
