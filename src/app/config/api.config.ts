//import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment.prod';

export const ApiEndpoints = {
  register: `${environment.apiBaseUrl}/registration`,
  events: `${environment.apiBaseUrl}/events`,
  media: `${environment.apiBaseUrl}/media`,
  alumni: `${environment.apiBaseUrl}/alumni`,
};
