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
- Dockerimage file for when you're ready to build for production
- Swagger UI for OpenAPI Docs

Notes:
- TypeORM is set to use MySQL, but you can change it to PostgreSQL, Mongo, etc.
- You can turn it into an SSR app if you wanted to; just add a template engine, some views, public folder, and you got yourself a web app.

## How to run?

### Development

1. edit the `.env.dev` file with your params
2. install dependencies with `npm install`
3. open a 1st terminal and run `npm run build:dev`. This will execute the typescript compiler in `watch mode`.
4. open a 2nd terminal and run `npm run start:dev`. This will start the app with nodemon.


### Production

1. copy `.env.dev` and rename it `.env.prod`. Edit the latter with your production params.
2. build docker image with: `docker build -t name_of_your_image .`
3. run docker container with: `docker --name name_for_your_container -p local_port:3000 name_of_your_image`

## Swagger UI 

Edit the swagger file `/src/swagger.json`. 
API docs found at `localhost:3000/api-docs/`.



**Fun, fast and easy** :)
