const ElasticEmail = require('@elasticemail/elasticemail-client');
require('dotenv').config();

const { ELASTIC_EMAIL_API_KEY } = process.env;

const defaultClient = ElasticEmail.ApiClient.instance;
const { apikey } = defaultClient.authentications;
apikey.apiKey = ELASTIC_EMAIL_API_KEY;

const api = new ElasticEmail.EmailsApi();

const sendEmail = async (verificationEmail, verificationLink) => {
  const email = ElasticEmail.EmailMessageData.constructFromObject({
    Recipients: [new ElasticEmail.EmailRecipient(verificationEmail)],
    Content: {
      Body: [
        ElasticEmail.BodyPart.constructFromObject({
          ContentType: 'HTML',
          Content: verificationLink,
        }),
      ],
      Subject: 'Verify email',
      From: 'khomych3301@gmail.com',
    },
  });

  await api.emailsPost(email).catch(err => console.log(err));
};

module.exports = sendEmail;
