import request from '@/utils/request'

export function listTask(query) {
  return request({
    url: '/patient/basisTask/list',
    method: 'get',
    params: query
  })
}

export function getTask(taskId) {
  return request({
    url: '/patient/basisTask/' + taskId,
    method: 'get'
  })
}

export function addTask(data) {
  return request({
    url: '/patient/basisTask',
    method: 'post',
    data: data
  })
}

export function updateTask(data) {
  return request({
    url: '/patient/basisTask',
    method: 'put',
    data: data
  })
}

export function delTask(taskIds) {
  return request({
    url: '/patient/basisTask/' + taskIds,
    method: 'delete'
  })
}

export function exportTask(query) {
  return request({
    url: '/patient/basisTask/export',
    method: 'get',
    params: query
  })
}
export function getTaskByPatientId(patientId) {
  return request({
    url: '/patient/basisTask/patientId/' + patientId,
    method: 'get'
  })
}
export function updateByPatientId(data) {
  return request({
    url: '/patient/basisTask/updateByPatientId/',
    method: 'post',
    data: data
  })
}
export function getWorkstation(workstation,patientId) {
  return request({
    url: '/patient/basisTask/getWorkstation/',
    method: 'get',
    params:{
      workstation:workstation,
      patientId:patientId,
    }
  })
}
