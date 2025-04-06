//import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment.prod';

export const ApiEndpoints = {
  alumni: `${environment.apiBaseUrl}/registration`,
  events: `${environment.apiBaseUrl}/events`,
  media: `${environment.apiBaseUrl}/media`
};
