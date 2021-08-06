import express from 'express';
import dotenv from 'dotenv';
import {
  list,
  send,
  remove,
  getTranscription,
  createVocabulary,
  createVocabularyFilter,
} from './methods.js';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', list);
app.get('/:jobName', getTranscription);
app.post('/', send);
app.post('/createVocabulary', createVocabulary);
app.post('/createVocabularyFilter', createVocabularyFilter);
app.delete('/', remove);

app.listen(3333, () => console.log('Server running'));
