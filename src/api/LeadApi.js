import { fetchEndPoint } from "./fetchEndPoint";

const FIND_ALL = '/crm.lead/find-all';
const UPDATE_LEAD = '/crm.lead/update-lead';

export function findAll(payload) {
  return fetchEndPoint(FIND_ALL, payload)
}

export function updateLead(payload) {
  return fetchEndPoint(UPDATE_LEAD, payload)
}