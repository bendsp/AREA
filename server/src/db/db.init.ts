const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

const clientId = '1003365867987-p6th64a1oaaraohh34ojbodbrp300451.apps.googleusercontent.com';
const clientSecret = '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';
const redirectUrl = 'https://developers.google.com/oauthplayground';

const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline', // Demande un refresh token
  scope: ['https://mail.google.com/'], // Accès à Gmail
});

console.log('Autoriser cette application en accédant à ce lien :', authUrl);