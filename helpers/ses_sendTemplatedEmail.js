const AWS = require("aws-sdk");

AWS.config.update({
    secretAccessKey: process.env.AWS_SECRETKEY,
    accessKeyId: process.env.AWS_ACCESSKEY_ID,
    region: process.env.AWS_SES_REGION
});

const ses = new AWS.SES({ apiVersion: "2010-12-01", region: 'us-east-1'});

const params = {
    "Source": "",
    "Template": "",
    "ConfigurationSetName": "",
    "Destination": {
        "ToAddresses": []
    },
    "TemplateData": ""
};

const sendTemplatedEmail = async (emailParams) => {
    if (emailParams.Source && emailParams.Template) {
        ses.sendTemplatedEmail(emailParams, (err, data) => {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data);           // successful response
        });
    } else {
        console.log('Please Set Email Params Properly');
    }
}

module.exports = {
    emailParams: params,
    sendTemplatedEmail: sendTemplatedEmail
}