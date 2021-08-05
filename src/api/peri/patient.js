import request from '@/utils/request'

export function listPatient(query) {
  return request({
    url: '/peri/patient/list',
    method: 'get',
    params: query
  })
}

export function getPatient(patientId) {
  return request({
    url: '/peri/patient/' + patientId,
    method: 'get'
  })
}

export function addPatient(data) {
  return request({
    url: '/peri/patient',
    method: 'post',
    data: data
  })
}

export function updatePatient(data) {
  return request({
    url: '/peri/patient',
    method: 'put',
    data: data
  })
}

export function delPatient(patientId) {
  return request({
    url: '/peri/patient/' + patientId,
    method: 'delete'
  })
}

export function exportPatient(query) {
  return request({
    url: '/peri/patient/export',
    method: 'get',
    params: query
  })
}

export function delAllTask(patientId) {
  return request({
    url: '/peri/patient/delAllTask/' + patientId,
    method: 'delete'
  })
}
