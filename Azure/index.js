require('dotenv');
const fs = require('fs');
const sdk = require('microsoft-cognitiveservices-speech-sdk');

const speechConfig = sdk.SpeechConfig.fromSubscription(
  process.env.KEY,
  process.env.LOCATION
);

speechConfig.speechRecognitionLanguage = 'pt-BR';

// Apenas no modo de reconhecimento contínuo. Coloca ponto de interrogação quando o locutor fala "ponto de interrogação"
// speechConfig.enableDictation();

function fromFile() {
  let audioConfig = sdk.AudioConfig.fromWavFileInput(
    fs.readFileSync('audio-grande.wav')
  );
  let recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

  // Adicionar frases para melhorar o reconhecimento
  const phraseList = sdk.PhraseListGrammar.fromRecognizer(recognizer);
  phraseList.addPhrase('Speech to Text');

  // Reconhecimento continuo
  recognizer.startContinuousRecognitionAsync();
  recognizer.recognizing = function (s, e) {
    console.log('recognizing text', e.result.text);
  };
  recognizer.recognized = function (s, e) {
    console.log('recognized text', e.result.text);
    script += e.result.text;
  };

  //Reconhecimento de um intervalo
  // recognizer.recognizeOnceAsync((result) => {
  //   console.log(`RECOGNIZED: Text=${result.text}`);
  //   recognizer.close();
  // });
}

fromFile();
