/* eslint-disable */
const { JWT } = require("google-auth-library");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const account = require("./account.json");

const GOOGLE_SHEET_ID = "1TWe1ZHGlab093l8nEpZ6P2yqIXkSxnEW_jguUeC8hA8";
const BASE_PATH = "public/locales";

const loadGoogleSheet = async () => {
  const auth = new JWT({
    email: account.client_email,
    key: account.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, auth);

  await doc.loadInfo();

  return doc;
};

module.exports = {
  loadGoogleSheet,
  BASE_PATH
};
