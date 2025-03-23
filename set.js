const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUc2QjFsNU5ENmFlTWtOOE9oa0JldENTT1RpNmJucmNHTTJHNEduU3ZWQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV2FKM2M0dnVRc0U4cWtKWHNRRm1nM1ROdlQyS3Y1bjZ2aEVMQkNtZTlqZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhTnprVU5RNVIwZmVybUZkbUtjVGpCRTIxRFUvR0tRZWthNkphZ2tUU2xrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUZGFuOE5aZkpvcDBEK2VpUWlWZlBOTHpsM21tTTNWTkp0Qlp5MUs2cG5JPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldFdkVyVlZGZmhTZ0VydHd4SHlKb1djUVpjWUF0aS85WUx1MU5aVXhGbHc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldrK1N6NTlIODhzMjV1VmdQYXFYdGsyYzJtcVJwUmhwcTNkbkg3WlhzMkk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUdrcjBtc2xzMjJmTmFKcHpWNmdGZG5kREtFdmVoQXgxYk51VFBkVFFYQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNVpKdURDUERQcVE5NW5Bbk1obFJSRUptVmtCTy8zZU52QXBoS0VZbE9WYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVBdEhVTy9vTzRWd1paNWlvN3BzZG8xenZ3TkRkamlnTVdzU3pOY0xGdGM2QXVFME0zNDV0cjFhTHNIemhjY0VFMVBHeVdUNUJHdUlBNm5nL3g3b0RnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA5LCJhZHZTZWNyZXRLZXkiOiJGRVJ1NUpESHZFZ0tRaitISVM4YnRnK3FxNUtZUmx6YmhTa1pUaEdrSnRrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJJa0NrZ2hMY1NxLTFsZU0xLVNlR3d3IiwicGhvbmVJZCI6Ijg4NDdlZDBhLWYyNTQtNGJkNy05NmRmLTI0YzUzYTllZTEzOSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJZE0wb1c0a3k3YVlidEd4YjlmbmpIYlMyazg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTkQ5dkMrak45R1cwN1RUWmtsbnh3OU1zOXlBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlFWSlpOUTFYIiwibWUiOnsiaWQiOiIyNTQ3NTg0NDMxMTE6NTZAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09PbndFWVF6ZXVBdndZWUFTQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Imx3Q0MvajB1eitaSTFLYmZBYUlOaU44d1JJRGNJeVNEdW1CalRzdkswaWs9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImFYaXdMSkxsY2JWRUgyQ3pDTEo4UUNSMUorRDg5MGtyREsyeGV0QkxHS0o4YjdldGxKODk0bmJuY2M0M3dIeEs1Vi9sN1BiSEtaUmpqbGhkTFExMER3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJiamVEUDJ2K2tkVGlXVitIL2I2TmwrY2w1czNnZ2VvRGVJVHR6SkhXQklnY3Jrb0c4Nmt0cUdNdktmKzJSWm42Z2xkYXJzYXd3eXVuK2t0S3BwOFJEZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc1ODQ0MzExMTo1NkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaY0FndjQ5THMvbVNOU20zd0dpRFlqZk1FU0EzQ01rZzdwZ1kwN0x5dElwIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQyNzQ3MDk5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUJ4MCJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "★Ꭿ☼︎ℒ☼︎ℒ✩ℰ✫ℕ♫",
    CAPTION : process.env.CAPTION || "CASEYRHODES-XMD",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "Caseyrhodes",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    ANTICALL: process.env.ANTICALL || 'yes',
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VakUEfb4o7qVdkwPk83E",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VakUEfb4o7qVdkwPk83E",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CASEYRHODES XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/21YS7vBf/lordali.jpg',
    URL: process.env.URL || "https://files.catbox.moe/yedfbr.jpg",
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    ANTIDELETEDM: process.env.ANTIDELETEDM|| "yes",
    AUTO_REPLY: process.env.AUTO_REPLY || "non",
    ADMGROUP: process.env.ADMGROUP || "non",
    CHAT_BOT : process.env.CHAT_BOT|| "non",
    AUTO_BIO: process.env.AUTO_BIO || "non",
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi",
    AUTO_SAVE_CONTACTS: process.env.AUTO_SAVE_CONTACTS || "non",
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    AUTOREAD_MESSAGES: process.env.AUTOREAD_MESSAGES || "non",
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || "yes",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
