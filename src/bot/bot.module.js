import { BotController } from './bot.controller.js';
import { BotStartupService } from './bot.startup.service.js';
import { Messagingservice } from './manage.chat/messaging.service.js';

// Loading messaging service
const messagingService = new Messagingservice();
// Loading bot startup service
const botStartupService = new BotStartupService(messagingService);
// Loading controller and injecting dependency
const botController = new BotController(botStartupService);
// Exporting controller
export { botController };
