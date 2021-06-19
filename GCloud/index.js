// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const util = require('util');

function main() {
  // [START speech_quickstart]
  // Imports the Google Cloud client library
  const speech = require('@google-cloud/speech');

  // Creates a client
  const client = new speech.SpeechClient();

  async function quickstart() {
    // The path to the remote LINEAR16 file
    const gcsUri = 'gs://teste-speech-to-text/televisao.wav';
    // const gcsUri = 'gs://cloud-samples-data/speech/brooklyn_bridge.raw';

    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
      uri: gcsUri,
    };
    const config = {
      //   encoding: 'OGG_OPUS',
      // sampleRateHertz: 48000,
      languageCode: 'pt-BR',
      maxAlternatives: 3,
      profanityFilter: true,
      enableAutomaticPunctuation: true,
      enableWordTimeOffsets: true,
    };
    const request = {
      audio: audio,
      config: config,
    };

    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    console.log(
      util.inspect(response.results, { showHidden: false, depth: null })
    );
  }
  quickstart();
  // [END speech_quickstart]
}

process.on('unhandledRejection', (err) => {
  console.error(err.message);
  process.exitCode = 1;
});

main(...process.argv.slice(2));
