import { fetchEndPoint } from "./fetchEndPoint";

const FIND_ALL = "/crm.lead/find-all";
const UPDATE_LEAD = "/crm.lead/update-lead";
const DELETE_LEAD = "/crm.lead/delete-lead";
const FIND_BY_PRIMARY_KEY = "/crm.lead/find-by-primary-key";

export function findAll(payload) {
  return fetchEndPoint(FIND_ALL, payload);
}

export function updateLead(payload) {
  return fetchEndPoint(UPDATE_LEAD, payload);
}

export function deleteLead(payload) {
  return fetchEndPoint(DELETE_LEAD, payload);
}

export function findByPrimaryKey(payload) {
  return fetchEndPoint(FIND_BY_PRIMARY_KEY, payload);
}