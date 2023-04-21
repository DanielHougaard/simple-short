import { ParsedUrlQuery } from 'querystring';

export interface Params extends ParsedUrlQuery {
  slug: string;
}
