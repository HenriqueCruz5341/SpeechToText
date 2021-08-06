import {
  StartTranscriptionJobCommand,
  ListTranscriptionJobsCommand,
  DeleteTranscriptionJobCommand,
  GetTranscriptionJobCommand,
  CreateVocabularyCommand,
  CreateVocabularyFilterCommand,
} from '@aws-sdk/client-transcribe';
import { transcribeClient } from './libs/transcribeClient.js';
import crypto from 'crypto';
import axios from 'axios';

export const list = async (req, res) => {
  const params = {
    // JobNameContains: 'KEYWORD',
  };
  try {
    const data = await transcribeClient.send(
      new ListTranscriptionJobsCommand(params)
    );
    return res.json(data);
  } catch (err) {
    res.status(400).send(err);
    console.log('Error', err);
  }
};

export const getTranscription = async (req, res) => {
  if (!req.params.jobName) return res.status(400).send('missing jobName');

  const params = {
    TranscriptionJobName: req.params.jobName,
  };
  try {
    const data = await transcribeClient.send(
      new GetTranscriptionJobCommand(params)
    );
    const fileUrl = data.TranscriptionJob.Transcript.TranscriptFileUri;
    const request = await axios.get(fileUrl);
    return res.json(request.data);
  } catch (err) {
    res.status(400).send(err);
    console.log('Error', err);
  }
};

export const send = async (req, res) => {
  const hash = crypto.randomBytes(8).toString('base64').replace(/\W/gm, '');
  const params = {
    TranscriptionJobName: 'speech-to-text-' + hash,
    // IdentifyLanguage: true,
    LanguageCode: req.body.languageCode,
    MediaFormat: req.body.mediaFormat,
    Media: {
      MediaFileUri: req.body.s3Url,
    },
    Settings: {
      // ChannelIdentification: true,
      // MaxAlternatives: 3,
      // MaxSpeakerLabels: 3,
      // ShowAlternatives: true,
      // ShowSpeakerLabels: true,
      VocabularyFilterMethod: 'mask',
      VocabularyFilterName: 'filter01',
      VocabularyName: 'vocabulary01',
    },
  };

  try {
    const data = await transcribeClient.send(
      new StartTranscriptionJobCommand(params)
    );
    return res.json(data);
  } catch (err) {
    res.status(400).send(err);
    console.log('Error', err);
  }
};

export const remove = async (req, res) => {
  if (!req.body.jobName) return res.status(400).send('missing jobName');

  const params = {
    TranscriptionJobName: req.body.jobName,
  };
  try {
    const data = await transcribeClient.send(
      new DeleteTranscriptionJobCommand(params)
    );
    return res.json(data);
  } catch (err) {
    res.status(400).send(err);
    console.log('Error', err);
  }
};

export const createVocabulary = async (req, res) => {
  const params = {
    LanguageCode: 'pt-BR',
    Phrases: ['Speech', 'to', 'Text'],
    // VocabularyFileUri: 'string',
    VocabularyName: 'vocabulary01',
  };

  try {
    const data = await transcribeClient.send(
      new CreateVocabularyCommand(params)
    );
    return res.json(data);
  } catch (err) {
    res.status(400).send(err);
    console.log('Error', err);
  }
};

export const createVocabularyFilter = async (req, res) => {
  const params = {
    LanguageCode: 'pt-BR',
    // VocabularyFilterFileUri: 'string',
    VocabularyFilterName: 'filter01',
    Words: ['foda'],
  };

  try {
    const data = await transcribeClient.send(
      new CreateVocabularyFilterCommand(params)
    );
    return res.json(data);
  } catch (err) {
    res.status(400).send(err);
    console.log('Error', err);
  }
};
