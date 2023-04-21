import axios from 'axios';
import httpSchema from '../constants/httpSchema';

export function createLink(url: string) {
  return axios.post('/api/link', { url });
}

// We need to get the host here, because we are using this function on the server side.
export function getLink(host: string, slug: string) {
  return axios.get(`${httpSchema}://${host}/api/link/${slug}`);
}
