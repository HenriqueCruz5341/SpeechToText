import { TranscribeClient } from '@aws-sdk/client-transcribe';
// Set the AWS Region.
const REGION = 'us-east-2'; //e.g. "us-east-1"
// Create Transcribe service object.
const transcribeClient = new TranscribeClient({ region: REGION });
export { transcribeClient };
