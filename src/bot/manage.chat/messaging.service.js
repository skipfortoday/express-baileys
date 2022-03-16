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
      try {
         await this.sock.presenceSubscribe(jid);
         await delay(500);

         await this.sock.sendPresenceUpdate('composing', jid);
         await delay(1500);

         await this.sock.sendPresenceUpdate('paused', jid);

         return await this.sock.sendMessage(jid, message);
      } catch (error) {
         return error;
      }
   }

   /**
    * @param {string} contact
    * @param {any} content
    * @returns {Promise<import('@adiwajshing/baileys').proto.WebMessageInfo>}
    */
   async textMessage(contact, content) {
      const jid = contact + '@s.whatsapp.net';
      console.log({ contact }, ' - ', { jid });
      return await this._sendMessageWTyping(jid, { text: content.text });
   }

   /**
    * @param {string} contact
    * @param {any} content
    * @returns {Promise<import('@adiwajshing/baileys').proto.WebMessageInfo>}
    */
   async buttonsMessage(contact, content) {
      const jid = contact + '@s.whatsapp.net';
      console.log(content);
      console.log({ contact }, ' - ', { jid });
      return await this._sendMessageWTyping(jid, {
         text: content.title,
         footer: content.footer,
         buttons: content.buttonList,
      });
   }

   /**
    * @param {string} contact
    * @param {any} content
    * @returns {Promise<import('@adiwajshing/baileys').proto.WebMessageInfo>}
    */
   async mdButtonsMessage(contact, content) {
      const jid = contact + '@s.whatsapp.net';
      return await this._sendMessageWTyping(jid, {
         text: content.title,
         footer: content.footer,
         templateButtons: content.mdButtonList,
      });
   }

   /**
    * @param {string} contact
    * @param {any} content
    * @returns {Promise<import('@adiwajshing/baileys').proto.WebMessageInfo>}
    */
   async imageMessage(contact, content) {
      const jid = contact + '@s.whatsapp.net';
      return await this._sendMessageWTyping(jid, {
         caption: content.title + '\n\n' + content.description,
         image: { url: content.url },
      });
   }

   /**
    * @param {string} contact
    * @param {any} content
    * @returns {Promise<import('@adiwajshing/baileys').proto.WebMessageInfo>}
    */
   async buttonsImageMessage(contact, content) {
      const jid = contact + '@s.whatsapp.net';
      return await this._sendMessageWTyping(jid, {
         caption: content.title + '\n\n' + content.description,
         footer: content.footer,
         image: { url: content.url },
         buttons: content.buttonList,
      });
   }

   /**
    * @param {string} contact
    * @param {any} content
    * @returns {Promise<import('@adiwajshing/baileys').proto.WebMessageInfo>}
    */
   async mdButtonsImageMessage(contact, content) {
      const jid = contact + '@s.whatsapp.net';
      return await this._sendMessageWTyping(jid, {
         caption: content.title + '\n\n' + content.description,
         footer: content.footer,
         image: { url: content.url },
         templateButtons: content.mdButtonList,
      });
   }

   /**
    * @param {string} contact
    * @param {any} content
    * @returns {Promise<import('@adiwajshing/baileys').proto.WebMessageInfo>}
    */
   async stikerMessage(contact, content) {
      const jid = contact + '@s.whatsapp.net';
      return await this._sendMessageWTyping(jid, { sticker: { url: content.url } });
   }
}
