/* eslint-disable no-param-reassign */
import urljoin from 'url-join';

export function createUrl(host: string, path: string): string {
  if (host) {
    host = /^(https?:)?\/\//.test(host) ? host : `//${host}`;
    return urljoin(host, path);
  }
  return path;
}

export function splitUrlPath(url: string): string[] {
  return url.split('/').filter((path) => !!path);
}
