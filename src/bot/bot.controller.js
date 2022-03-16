export class BotController {
   /**
    * @param {import('./bot.startup.service').BotStartupService} botStartupService
    */
   constructor(botStartupService) {
      // Dependency
      this.botStartupService = botStartupService;
   }

   connection(request, response) {
      const { sessionName } = request.params;
      this.botStartupService.response = response;
      this.botStartupService.sessionName = sessionName;
      return this.botStartupService.connectOnWhatsapp();
   }

   async sendText(request, response) {
      const { contact } = request.params;
      const content = request.body;
      const messageSent = await this.botStartupService.messagingService.textMessage(
         contact,
         content,
      );
      return response.status(200).json({ messageSent });
   }

   async sendButtons(request, response) {
      const { contact } = request.params;
      const content = request.body;
      const messageSent = await this.botStartupService.messagingService.buttonsMessage(
         contact,
         content,
      );
      return response.status(200).json({ messageSent });
   }

   async sendMDButtons(request, response) {
      const { contact } = request.params;
      const content = request.body;
      const messageSent = await this.botStartupService.messagingService.mdButtonsMessage(
         contact,
         content,
      );
      return response.status(200).json({ messageSent });
   }

   async sendImage(request, response) {
      const { contact } = request.params;
      const content = request.body;
      const messageSent = await this.botStartupService.messagingService.imageMessage(
         contact,
         content,
      );
      return response.status(200).json({ messageSent });
   }

   async sendButtonsImage(request, response) {
      const { contact } = request.params;
      const content = request.body;
      const messageSent = await this.botStartupService.messagingService.buttonsImageMessage(
         contact,
         content,
      );
      return response.status(200).json({ messageSent });
   }

   async sendMdButtonsImage(request, response) {
      const { contact } = request.params;
      const content = request.body;
      const messageSent = await this.botStartupService.messagingService.mdButtonsImageMessage(
         contact,
         content,
      );
      return response.status(200).json({ messageSent });
   }

   async sendMdStiker(request, response) {
      const { contact } = request.params;
      const content = request.body;
      const messageSent = await this.botStartupService.messagingService.stikerMessage(
         contact,
         content,
      );
      return response.status(200).json({ messageSent });
   }
}
