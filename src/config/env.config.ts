// // src/config/env.config.ts
// import dotenv from 'dotenv';

// dotenv.config();

// const requiredVars = [
//   'BASE_URL',
//   'LOCAL_HOST',
//   'API',
//   'ASSET', 
// ];

// requiredVars.forEach((varName) => {
//   if (!process.env[varName]) {
//     throw new Error(`Missing required environment variable: ${varName}`);
//   }
// });


 

export const BASE_URL = import.meta.env.VITE_BASE_URL as string;
export const LOCAL_HOST = import.meta.env.VITE_LOCAL_HOST as string;
export const API = import.meta.env.VITE_API as string;
export const ASSET = import.meta.env.VITE_ASSET as string;