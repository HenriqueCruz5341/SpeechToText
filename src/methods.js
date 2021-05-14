const fs = require('fs');
const path = require('path');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

module.exports = {
  async sendFile(req, res) {
    const { fileName, contentType, model, keywords, keywordsThreshold } =
      req.body;

    speechToText = new SpeechToTextV1({
      authenticator: new IamAuthenticator({ apikey: process.env.API_KEY }),
      serviceUrl: process.env.SERVICE_URL,
    });

    try {
      const params = {
        audio: fs.createReadStream(path.join(__dirname, 'resources', fileName)),
        contentType,
        model,
        keywords,
        keywordsThreshold,
        // maxAlternatives: 3,
        // wordConfidence: true,
        // smartFormatting: true,
      };

      const result = await speechToText.recognize(params);

      const output = fileName + Date.now() + '.txt';

      fs.writeFileSync(
        path.join(__dirname, 'results', output),
        result.result.results[0].alternatives[0].transcript
      );

      res.json(result.result);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
