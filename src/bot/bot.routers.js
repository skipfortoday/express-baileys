import { Router } from 'express';
import { botController } from './bot.module.js';

const botRouter = Router();

botRouter.get('/export-qrcode/:sessionName', (request, response) => {
   return botController.connection(request, response);
});

botRouter.post('/send-text/:contact', (request, response) => {
   return botController.sendText(request, response);
});

botRouter.post('/send-buttons/:contact', (request, response) => {
   return botController.sendButtons(request, response);
});

botRouter.post('/send-md-buttons/:contact', (request, response) => {
   return botController.sendMDButtons(request, response);
});

botRouter.post('/send-image/:contact', (request, response) => {
   return botController.sendImage(request, response);
});

botRouter.post('/send-buttons-image/:contact', (request, response) => {
   return botController.sendButtonsImage(request, response);
});

botRouter.post('/send-md-buttons-image/:contact', (request, response) => {
   return botController.sendMdButtonsImage(request, response);
});

botRouter.post('/send-stiker/:contact', (request, response) => {
   return botController.sendMdStiker(request, response);
});

export { botRouter };
