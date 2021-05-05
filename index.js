require("dotenv").config();
const notifier = require("node-notifier");

const { initSearch } = require("./src/sherlock");
const { Whatsapp } = require("./src/whatsapp");
const { pad } = require("./src/utils");

const notificationNumber = process.env.WA_NOTIFICATION_ID;
const sound = [
  "Basso",
  "Blow",
  "Bottle",
  "Frog",
  "Funk",
  "Glass", // ---
  "Hero",
  "Morse",
  "Ping",
  "Pop",
  "Purr",
  "Sosumi",
  "Submarine",
  "Tink",
];

const [pinCode = 124001, age = 18, sec = 60] = process.argv.slice(2);
const today = new Date();
const date =
  pad(today.getDate(), 2, 0) +
  "-" +
  pad(today.getMonth() + 1, 2, 0) +
  "-" +
  today.getFullYear();

const waClient = new Whatsapp();

initSearch({ date, pinCode, age, sec }, (msg) => {
  notifier.notify(
    {
      title: "⚠️ VACCINE IS AVAILLABLE",
      message: msg,
      sound: sound[5],
      wait: true,
      timeout: 1000,
    },
    function (err, response, metadata) {}
  );
  waClient.sendMessage(msg, notificationNumber);
});

/**
 * Uncomment if you wanna console contacts
 * =======================================
 */
// waClient.getContacts(console.log);

/**
 * Uncomment if you wanna console chats
 * =======================================
 */
// waClient.getChats(console.log);
