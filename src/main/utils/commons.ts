export function generateShortRandomString(length: number = 4): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

export async function generateSessionId(): Promise<string> {
  const { v4: uuidv4 } = await import('uuid');
  return uuidv4();
}

export function generateCustomHeaders(customHeaders: Object): Object {
  let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }

  for( const [key, value] of Object.entries(customHeaders)) {
    headers[key] = value;
  }
  return headers;
}