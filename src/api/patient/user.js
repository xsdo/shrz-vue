import request from '@/utils/request'

export function listUser(query) {
  return request({
    url: '/patient/user/list',
    method: 'get',
    params: query
  })
}

export function getUser(patientId) {
  return request({
    url: '/patient/user/' + patientId,
    method: 'get'
  })
}

export function addUser(data) {
  return request({
    url: '/patient/user',
    method: 'post',
    data: data
  })
}

export function updateUser(data) {
  return request({
    url: '/patient/user',
    method: 'put',
    data: data
  })
}

export function delUser(patientId) {
  return request({
    url: '/patient/user/' + patientId,
    method: 'delete'
  })
}
export function exportUser(query) {
  return request({
    url: '/patient/user/export',
    method: 'get',
    params: query
  })
}
export function listNation(query) {
  return request({
    url: '/patient/user/nationList',
    method: 'get',
    params: query
  })
}

export function listPatientCategories(query) {
  return request({
    url: '/patient/user/patientCategoriesList',
    method: 'get',
    params: query
  })
}
export function listSysHometown(query) {
  return request({
    url: '/patient/user/sysHometownList',
    method: 'get',
    params: query
  })
}
export function delUserTask(patientId) {
  return request({
    url: '/patient/user/delUserTask/' + patientId,
    method: 'delete'
  })
}
export function updateDelFlag(patientId) {
  return request({
    url: '/patient/user/updateDelFlag/'+patientId,
    method: 'get',
  })
}
