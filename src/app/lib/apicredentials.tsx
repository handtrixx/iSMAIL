import yaml from 'js-yaml';
import fs from 'fs';
import { auth } from '../../auth';

export default async function apiCredentials(request) {
  //if request comes from localhost, allow it
  if (request.headers.get('host') === 'localhost:3000') {
    return true;
  }
  //if request comes from logged in user, allow it
  const session = await auth();
  if (session?.user) return true;

  const apiKey = request.headers.get('x-api-key');

  // Check for the presence of both headers
  if (!apiKey) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  //load users from yaml file
  const config = await yaml.load(fs.readFileSync('/app/config.yml', 'utf8'));
  const apiCredentials = config['APIUSERS'];

  //loop through apiCredentials and search for entries fitting apiKey in key "api_key"
  const apiCredentialsData = apiCredentials.filter(
    cred => cred.api_key === request.headers.get('x-api-key')
  );

  const valid = apiCredentialsData.length > 0;

  if (!valid) {
    return new Response(JSON.stringify({ message: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return true;
}
