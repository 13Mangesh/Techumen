const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });
admin.initializeApp(functions.config().firebase);
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const oauth2Client = new OAuth2(
	'', // ClientID
	'', // Client Secret
	'https://developers.google.com/oauthplayground' // Redirect URL
);

oauth2Client.setCredentials({
	refresh_token: '',
});
const accessToken = oauth2Client.getAccessToken();

let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		type: 'OAuth2',
		user: '',
		clientId: '',
		clientSecret: '',
		refreshToken: '',
		accessToken: '',
	},
});

exports.sendMail = functions.https.onRequest((req, res) => {
	cors(req, res, () => {
		const dest = req.query.dest;
		const qr = req.query.qr;
		const mailOptions = {
			from: 'ACSES',
			to: dest,
			subject: 'Confirmation mail',
			html: `<h4>Warm greetings from ACSES</h4>
                    <p>Thank you for participating in TECHUMEN 2019. Participants are requested to be present on time.</p>
                    <p>Registration will start on 8 AM on respective day of your event.</p>
                    <p>Venue: Walchand college of Engineering</p>
                    <br/>
                    <p>Regards,</p>
                    Team ACSES
            <img src = ${qr}>`,
		};

		return transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return res.send(error.toString());
			} else {
				return res.send('sended');
			}
		});
	});
});
