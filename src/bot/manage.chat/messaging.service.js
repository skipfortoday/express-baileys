import { delay } from '@adiwajshing/baileys';

export class Messagingservice {
   constructor() {
      this.sock = {};
   }

   /**
    * @param {string} jid
    * @param {import('@adiwajshing/baileys').AnyMessageContent} message
    * @returns {Promise<import('@adiwajshing/baileys').proto.WebMessageInfo>}
    */
   async _sendMessageWTyping(jid, message) {
      await this.sock.presenceSubscribe(jid);
      await delay(500);

      await this.sock.sendPresenceUpdate('composing', jid);
      await delay(1500);

      await this.sock.sendPresenceUpdate('paused', jid);

      return await this.sock.sendMessage(jid, message);
   }

   async textMessage({ contact, text }) {
      const jid = contact + '@s.whatsapp.net';
      try {
         return await this._sendMessageWTyping(jid, { text });
      } catch (error) {
         return error;
      }
   }

   async buttonsMessage({ contact, buttonList, title, footer }) {
      const jid = contact + '@s.whatsapp.net';
      return await this._sendMessageWTyping(jid, {
         text: title,
         footer,
         buttons: buttonList,
         headerType: 1,
      });
   }

   async mdButtonsMessage({ contact, title, footer, mdButtonList }) {
      const jid = contact + '@s.whatsapp.net';
      return await this._sendMessageWTyping(jid, {
         text: title,
         footer,
         templateButtons: mdButtonList,
         headerType: 1,
      });
   }

   async imageMessage({ contact, url, title, description }) {
      const jid = contact + '@s.whatsapp.net';
      return await this._sendMessageWTyping(jid, {
         caption: title + '\n\n' + description,
         image: { url },
      });
   }

   async buttonsImageMessage({ contact, buttonList, url, title, description, footer }) {
      const jid = contact + '@s.whatsapp.net';
      return await this._sendMessageWTyping(jid, {
         caption: title + '\n\n' + description,
         footer,
         image: { url },
         buttons: buttonList,
      });
   }

   async mdButtonsImageMessage({ contact, mdButtonList, url, title, description, footer }) {
      const jid = contact + '@s.whatsapp.net';
      return await this._sendMessageWTyping(jid, {
         caption: title + '\n\n' + description,
         footer,
         templateButtons: mdButtonList,
         image: { url },
      });
   }
}
