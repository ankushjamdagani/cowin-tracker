# Cowin Vaccine Tracker

> Everything is done locally on target machine. Nothing is shared anywhere.

> Requires [node](https://nodejs.dev/) to be installed already.

## Steps to run

- Open terminal/command prompt.
- run `cp .env.sample .env`.
- OPTIONAL - Enter `WA_NOTIFICATION_ID` for the user/channel you wanna get notified at.
- `yarn install` or `npm install`
- `yarn start <PINCODE> <AGE> <SEC>` or `npm start <PINCODE> <AGE> <SEC>`
- For first time user only:
  - Scan the QR Code using whatsapp to login.

## Example

- `yarn start 124001 18 60`
- `yarn start 124001 45`

## Defaults

- PINCODE - 124001
- AGE - 18
- SEC - 60

## FAQ

**Where can I get whatsapp user id**

- To get id from contacts
  Uncomment `waClient.getContacts(console.log);` in index.js
- To get id from current chats
  Uncomment `waClient.getChats(console.log);` in index.js

## References

- [whatsapp-web.js](https://pedroslopez.me/whatsapp-web.js/index.html)
- [qrcode-terminal](https://github.com/gtanner/qrcode-terminal)
- [node-notifier](https://github.com/mikaelbr/node-notifier#readme)
