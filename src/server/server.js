import express, { urlencoded, json } from 'express';
import cors from 'cors';
import { botRouter } from '../bot/bot.routers.js';

export function server() {
   const app = express();
   app.use(urlencoded({ extended: true }));
   app.use(json());

   app.use((request, response, next) => {
      response.header('Access-Control-Allow-Origin', '*');
      response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
      response.header('Accept', 'aplication/json');
      next();
   });

   app.options('*', cors);

   app.use(botRouter);

   return app;
}
