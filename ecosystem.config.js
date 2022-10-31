module.exports = {
    apps: [{
        name: "any-backend-now",
        script: "./dist/server.js",
        env: {
            NODE_ENV: "development",
            APP_NAME:"Any Backend Now",
            HOST:"localhost",
            PORT:3000,
            SITE_URL:"http://localhost:3000",
            JWT_ACCESS_SECRET:"MY_ACCESS_SECRET",
            JWT_REFRESH_SECRET:"MY_REFRESH_SECRET",
            JWT_RESET_SECRET:"MY_RESET_SECRET",
            REDIS_HOST:"localhost",
            REDIS_PORT:6379,
            REDIS_PASSWORD:"",
            MYSQL_HOST:"localhost",
            MYSQL_PORT:3306,
            MYSQL_USERNAME:"root",
            MYSQL_PASSWORD:"password",
            MYSQL_DATABASE:"abn",
            AWS_ACCESS_KEY_ID:"ACCESS_KEY_ID",
            AWS_SECRET_ACCESS_KEY:"SECRET_ACCESS_KEY",
            AWS_REGION:"us-east-1",
            AWS_BUCKET:"bucket-name",
            SENDGRID_API_KEY:"SG.APY_KEY",
            NO_REPLY_EMAIL_ADDRESS:"noreply@email.com",
        },
        env_production: {
            NODE_ENV: "production",
            APP_NAME:"Your Awesome App",
            HOST:"localhost",
            PORT:3000,
            SITE_URL:"https://your.domain.com",
            JWT_ACCESS_SECRET:"MY_ACCESS_SECRET",
            JWT_REFRESH_SECRET:"MY_REFRESH_SECRET",
            JWT_RESET_SECRET:"MY_RESET_SECRET",
            REDIS_HOST:"localhost",
            REDIS_PORT:6379,
            REDIS_PASSWORD:"",
            MYSQL_HOST:"localhost",
            MYSQL_PORT:3306,
            MYSQL_USERNAME:"root",
            MYSQL_PASSWORD:"password",
            MYSQL_DATABASE:"abn",
            AWS_ACCESS_KEY_ID:"ACCESS_KEY_ID",
            AWS_SECRET_ACCESS_KEY:"SECRET_ACCESS_KEY",
            AWS_REGION:"us-east-1",
            AWS_BUCKET:"bucket-name",
            SENDGRID_API_KEY:"SG.APY_KEY",
            NO_REPLY_EMAIL_ADDRESS:"noreply@your.domain.com",
        },
    }]
}