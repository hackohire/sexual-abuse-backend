const AWS = require("aws-sdk");

// const config = {
//   region: process.env.AWS_SES_REGION,
//   accessKeyId: process.env.AWS_ACCESSKEY_ID,
//   secretAccessKey: process.env.AWS_SECRETKEY,
// }

// AWS.config.update(config);

const ses = new AWS.SES({ apiVersion: "2010-12-01", region: 'us-east-1'}); 

const AppCreationNotificationToAdmin = {
  "Template": {
    "TemplateName": "AppCreationNotificationToAdmin",
    "SubjectPart": "Application Creation Notification",
    "HtmlPart": "<h1>Hello {{name}},</h1><p>An application {{appName}} has been created. Please Click here {{link}} to check the details.</p>",
    "TextPart": ""
  }
}

const ProductCreationNotificationToAdmin = {
  "Template": {
    "TemplateName": "ProductCreationNotificationToAdmin",
    "SubjectPart": "Product Creation Notification",
    "HtmlPart": "<h1>Hello {{name}},</h1><p>A product {{productName}} has been created. Please Click here {{link}} to check the details.</p>{{productDetails}}<p>",
    "TextPart": ""
  }
}

const params = {
  "Template": {
    "TemplateName": "ProductCreationNotificationToAdmin",
    "SubjectPart": "Product Creation Notification",
    "HtmlPart": "<h1>Hello {{name}},</h1><p>A product {{productName}} has been created. Please Click here {{link}} to check the details.</p>{{productDetails}}<p>",
    "TextPart": ""
  }
}

ses.createTemplate(params, (err, data) =>  {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});