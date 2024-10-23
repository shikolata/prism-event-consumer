import { http, HttpResponse } from 'msw';
import { VrClass, VrUser } from '../src/models/studentHealth'
import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const handlers = [
  http.post(`https://${process.env.EVENT_STORE_HOST}`, () => {
    return HttpResponse.json();
  }),

  http.get(`https://${process.env.DB_SERVICES_HOST}/user/1`, () => {
    const vrUser: VrUser = {
      firstName: 'John',
      lastName: 'Maverick',
    };
    return HttpResponse.json(vrUser);
  }),

  http.get(`https://${process.env.DB_SERVICES_HOST}/class/1`, () => {
    const vrClass: VrClass = {
      className: 'Math 101'
    };
    return HttpResponse.json(vrClass);
  }),
  
  http.get(`https://${process.env.DB_SERVICES_HOST}/task/class/1`, () => {
    return HttpResponse.json([1, 2, 3, 4, 5]);
  }),
  
  http.post(`https://${process.env.DB_SERVICES_HOST}/action`, () => {
    return HttpResponse.json(22);
  }),
  
  http.post(`https://${process.env.DB_DASHBOARD_HOST}`, () => {
    return HttpResponse.json();
  }),
]