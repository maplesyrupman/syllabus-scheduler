import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';
import {google} from 'googleapis'
import axios from 'axios'

async function authorize(token:string) {
  const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
  oauth2Client.setCredentials({ access_token: token });
  return oauth2Client;
}

const testEvent = {
  'summary': 'Test Event 1',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2023-12-20T07:00:00-07:00',
    'timeZone': 'America/New_York',
  },
  'end': {
    'dateTime': '2023-12-20T08:30:00-07:00',
    'timeZone': 'America/New_York',
  },
  // 'recurrence': [
  //   'RRULE:FREQ=DAILY;COUNT=2' //must change 
  // ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'popup', 'minutes': 10},
    ],
  },
};

const testEvent2 = {
  'summary': 'Test Event 2',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2023-12-21T07:00:00-07:00',
    'timeZone': 'America/New_York',
  },
  'end': {
    'dateTime': '2023-12-21T08:30:00-07:00',
    'timeZone': 'America/New_York',
  },
  // 'recurrence': [
  //   'RRULE:FREQ=DAILY;COUNT=2' //must change 
  // ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'popup', 'minutes': 10},
    ],
  },
};

const events = [testEvent, testEvent2]

async function batchUploadEvents(auth:any, events:any) {
  const calendar = google.calendar({ version: 'v3', auth });

  // Construct the body of the batch request
  let requestBody = '';
  const boundary = 'batch_boundary';
  events.forEach((event:any, index:any) => {
    requestBody += `--${boundary}\n`;
    requestBody += 'Content-Type: application/http\n';
    requestBody += 'Content-ID: <item' + index + '>\n\n';
    requestBody += 'POST /calendar/v3/calendars/primary/events\n';
    requestBody += 'Content-Type: application/json\n\n';
    requestBody += JSON.stringify(event) + '\n\n';
  });
  requestBody += `--${boundary}--`;

  // Make the batch request
  const response = await axios.post('https://www.googleapis.com/batch/calendar/v3', requestBody, {
    headers: {
      'Content-Type': `multipart/mixed; boundary=${boundary}`,
      'Authorization': `Bearer ${auth.credentials.access_token}`
    }
  });

  return response.data;
}


export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (token) {
      const oauth2Client = await authorize(token.accessToken as string);
      const batchResponse = await batchUploadEvents(oauth2Client, events)
  
      return NextResponse.json({message: "success!", response: batchResponse})
      // Your logic to call Google Calendar API
      // ...
    } else {
      return NextResponse.json({ error: 'Unauthorized' }, {status: 401});
    }
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: err}, {status: 500})
  }
}