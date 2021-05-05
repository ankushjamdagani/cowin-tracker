const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const fs = require("fs");

const SESSION_FILE_PATH = "./session.json";

class Whatsapp {
  constructor() {
    this.client = null;
    this.ready = false;
    this.looadSession(this.loadWhatsappClient);
  }

  looadSession = (cb) => {
    if (fs.existsSync(SESSION_FILE_PATH)) {
      fs.readFile(SESSION_FILE_PATH, "utf-8", (err, jsonString) => {
        const data = JSON.parse(jsonString);
        cb(data);
      });
    } else {
      cb();
    }
  };

  loadWhatsappClient = (sessionData) => {
    this.client = new Client({
      session: sessionData,
    });

    this.client.on("qr", this.onQR);
    this.client.on("authenticated", this.onAuthenticated);
    this.client.on("ready", this.onReady);

    this.client.initialize();
  };

  onQR = (qr) => {
    qrcode.generate(qr, { small: true });
  };

  onAuthenticated = (session) => {
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
      if (err) {
        console.error(err);
      }
    });
  };

  onReady = () => {
    this.ready = true;
    console.log("whatsapp - raedy");
  };

  sendMessage = (msg, number, cb = () => {}) => {
    if (this.client && this.ready) {
      this.client.sendMessage(number, msg).then(cb);
    } else {
      setTimeout(() => {
        this.sendMessage(msg, number, cb);
      }, 1000);
    }
  };

  getContacts = (cb) => {
    if (this.client && this.ready) {
      this.client.getContacts().then(cb);
    } else {
      setTimeout(() => {
        this.getContacts(cb);
      }, 1000);
    }
  };

  getChats = (cb) => {
    if (this.client && this.ready) {
      this.client.getChats().then(cb);
    } else {
      setTimeout(() => {
        this.getChats(cb);
      }, 1000);
    }
  };
}

module.exports = { Whatsapp };
