require('dotenv').config()

export const port = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = parseInt(process.env.DB_PORT) || 5432;
export const DB_USERNAME = process.env.DB_USERNAME || "john";
export const DB_PASSWORD = process.env.DB_PASSWORD || "doe";
export const DB_NAME = process.env.DB_NAME || "db_name";

export const jwtSecret = process.env.JWT_SECRET_KEY || "cosmic";
export const jwtExpiry = process.env.JWT_EXPIRY_TIME || 60;