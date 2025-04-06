import { environment } from '../../environments/environment.prod';

export const ApiEndpoints = {
  alumni: `${environment.apiBaseUrl}/alumni`,
  events: `${environment.apiBaseUrl}/events`,
  media: `${environment.apiBaseUrl}/media`
};
