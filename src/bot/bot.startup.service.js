import makeWASocket, {
   DisconnectReason,
   fetchLatestBaileysVersion,
   useSingleFileAuthState,
} from '@adiwajshing/baileys';
import { checkPath } from '../utils/check.path.js';
import P from 'pino';
import { toDataURL } from 'qrcode';

export class BotStartupService {
   /**
    * @param {import('./manage.chat/messaging.service').Messagingservice} messagingService
    */
   constructor(messagingService) {
      this._pathMD = './sessionsMD/';
      this._sock = {};
      this.sessionName = '';
      // Dependencies
      this.messagingService = messagingService;
      // work around - not recommended, use socket for connection
      this.response = {};
   }

   /**
    * @param {import('@adiwajshing/baileys').WASocket} sock
    * @param {string} sessionName
    * @param {import('express').Response} response
    */
   _connectionUpdate(sock) {
      sock.ev.on('connection.update', ({ connection, lastDisconnect, qr }) => {
         if (qr) {
            toDataURL(qr, (err, url) => {
               if (err) {
                  this.response.status(404).json({ message: 'error generating qrcode' });
               } else {
                  this.response.status(201).json({ QRBase64: url });
               }

               this.response.end();
            });
         }

         if (connection === 'close') {
            const shouldRecnnect =
               lastDisconnect.error?.output.statuscode !== DisconnectReason.loggedOut;
            if (shouldRecnnect) {
               this.connectiOnWhatsapp();
            }
         } else if (connection === 'open') {
            console.log('CONNECTED WHATSAPP MD');
            this.response.end();
         }
      });
   }

   async connectiOnWhatsapp() {
      checkPath(this._pathMD);

      const { version } = await fetchLatestBaileysVersion();
      const { state, saveState } = useSingleFileAuthState(
         this._pathMD + this.sessionName + '.json',
      );

      const settings = {
         printQRInTerminal: true,
         connectTimeoutMs: 60000,
         auth: state,
         logger: P({ level: 'error' }),
         version,
         async getMessage(key) {
            return { conversation: 'hi' };
         },
      };

      this._sock = makeWASocket.default(settings);

      // Loading the sock of the messaging service
      this.messagingService.sock = this._sock;

      this._sock.ev.on('messages.upsert', async ({ messages, type }) => {
         const msg = messages[0];

         if (msg.key.fromMe === false) {
            console.log('MESSAGE: ', messages[0]);
         }
      });

      this._connectionUpdate(this._sock);

      this._sock.ev.on('creds.update', saveState);
   }
}
