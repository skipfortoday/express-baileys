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
      return this.botStartupService.connectiOnWhatsapp(sessionName, response);
   }

   async sendText(request, response) {
      const { contact } = request.params;
      const { text } = request.body;
      const messageSent = await this.botStartupService.messagingService.textMessage({
         contact,
         text,
      });
      return response.status(200).json({ messageSent });
   }

   async sendButtons(request, response) {
      const { contact } = request.params;
      const { title, buttonList, footer } = request.body;
      const messageSent = await this.botStartupService.messagingService.buttonsMessage({
         contact,
         title,
         buttonList,
         footer,
      });
      return response.status(200).json({ messageSent });
   }

   async sendMDButtons(request, response) {
      const { contact } = request.params;
      const { title, mdButtonList, footer } = request.body;
      const messageSent = await this.botStartupService.messagingService.mdButtonsMessage({
         contact,
         title,
         footer,
         mdButtonList,
      });
      return response.status(200).json({ messageSent });
   }

   async sendImage(request, response) {
      const { contact } = request.params;
      const { title, url, description } = request.body;
      const messageSent = await this.botStartupService.messagingService.imageMessage({
         contact,
         title,
         url,
         description,
      });
      return response.status(200).json({ messageSent });
   }

   async sendButtonsImage(request, response) {
      const { contact } = request.params;
      const { title, description, url, buttonList, footer } = request.body;
      const messageSent = await this.botStartupService.messagingService.buttonsImageMessage({
         contact,
         buttonList,
         url,
         title,
         description,
         footer,
      });
      return response.status(200).json({ messageSent });
   }

   async sendMdButtonsImage(request, response) {
      const { contact } = request.params;
      const { title, description, url, mdButtonList, footer } = request.body;
      const messageSent = await this.botStartupService.messagingService.mdButtonsImageMessage({
         contact,
         mdButtonList,
         url,
         title,
         description,
         footer,
      });
      return response.status(200).json({ messageSent });
   }
}
