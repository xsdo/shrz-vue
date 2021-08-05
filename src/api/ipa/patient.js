import request from '@/utils/request'

export function listPatient(query) {
  return request({
    url: '/ipa/patient/list',
    method: 'get',
    params: query
  })
}

export function getPatient(patientId) {
  return request({
    url: '/ipa/patient/' + patientId,
    method: 'get'
  })
}

export function addPatient(data) {
  return request({
    url: '/ipa/patient',
    method: 'post',
    data: data
  })
}

export function updatePatient(data) {
  return request({
    url: '/ipa/patient',
    method: 'put',
    data: data
  })
}

export function delPatient(patientId) {
  return request({
    url: '/ipa/patient/' + patientId,
    method: 'delete'
  })
}

export function exportPatient(query) {
  return request({
    url: '/ipa/patient/export',
    method: 'get',
    params: query
  })
}

export function delAllTask(patientId) {
  return request({
    url: '/ipa/patient/delAllTask/' + patientId,
    method: 'delete'
  })
}
