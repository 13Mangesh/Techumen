const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp(functions.config().firebase);
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const oauth2Client = new OAuth2(
    "365019370149-399ml3uuhtokdq8dv1201nvmq5uopfaf.apps.googleusercontent.com", // ClientID
    "t8fsmRVsB45HLeqlGi658luh", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: "1/UB-u34--M3H19HWh1_NFt5bgLbezJMe3J3zqx41khso"
});
const accessToken = oauth2Client.getAccessToken()

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: '13mangeshpuri@gmail.com',
        clientId: "365019370149-399ml3uuhtokdq8dv1201nvmq5uopfaf.apps.googleusercontent.com",
        clientSecret: "t8fsmRVsB45HLeqlGi658luh",
        refreshToken: "1/UB-u34--M3H19HWh1_NFt5bgLbezJMe3J3zqx41khso",
        accessToken: "ya29.Il-PB2_Ea-4UniDPT7DO1W18aJDr94QpkqxGXI-UBMhyQ-O5l7tms1QBoAxCZGUochx0O4jNQngy5ZC8ZrGcgNcL5dzUr8rU64esWioJk_cLY7ryo7mWuyDOSO3jHT4LSw"
    }
});

// refresh token - 1/UB-u34--M3H19HWh1_NFt5bgLbezJMe3J3zqx41khso
// Access toekn - ya29.Il-PB2_Ea-4UniDPT7DO1W18aJDr94QpkqxGXI-UBMhyQ-O5l7tms1QBoAxCZGUochx0O4jNQngy5ZC8ZrGcgNcL5dzUr8rU64esWioJk_cLY7ryo7mWuyDOSO3jHT4LSw

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
            <img src = ${qr}>`
        };

        return transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                return res.send(error.toString());
            } else{
                return res.send('sended');
            }
        });
    });
});