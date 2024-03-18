import makeWaSocket, {
  DisconnectReason,
  useMultiFileAuthState,
  MessageType,
  MessageOptions,
  Mimetype
} from '@whiskeysockets/baileys';
import { MongoClient } from 'mongodb';
import 'dotenv/config';
import useMongoDBAuthState from '.././dbAuth/MongoAuth';

const mongoUrl: string = process.env.MONGO_CONNECT;
const client = new MongoClient(mongoUrl);

async function connectToWa(): void {
  
  await client.connect();
  const database: any = mongoClient
    .db("databun")
    .collection("bundata");
  const { state, saveCreds } = await useMongoDBAuthState(database);
  const sock: any = makeWASocket({
    printQRInTerminal: true,
    auth: state,
  });
  
  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update || {};
    if (qr) console.log(qr);
    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) {
        connectToWa();
      }
    }
  });
  
  sock.ev.on("messages.update", (messageInfo) => {
    console.log("receiving message!");
  });
  
  sock.ev.on("messages.upsert", async({messages, type}): void => {
    try {
      
      const captureMessage: string = messages[0].message.extendedTextMessage.text;
      const numberWa: string = messages[0]?.key?.remoteJid;
      const args: string = captureMessage.trim().split(/ +/).slice(1);
      const compareMessage: string = captureMessage.toLowerCase().split(' ')[0] || '';
      
      if(type === "notify") {
        switch (compareMessage) {
          case 'ping':
            await sock.sendMessage(numberWa, {
              text: "hi"
            })
            break;
          default:
            await sock.sendPresenceUpdate('recording', numberWa);
            break;
        }
      } else {
        await sock.sendPresenceUpdate('composing', numberWa);
      }
      
    } catch (error) {
      console.log(error);
    }
  });
  
  sock.ev.on("creds.update", saveCreds);
}

connectToWa();