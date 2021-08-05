import request from '@/utils/request'

export function listTask(query) {
  return request({
    url: '/patient/advancedTask/list',
    method: 'get',
    params: query
  })
}

export function getTask(taskId) {
  return request({
    url: '/patient/advancedTask/' + taskId,
    method: 'get'
  })
}

export function addTask(data) {
  return request({
    url: '/patient/advancedTask',
    method: 'post',
    data: data
  })
}

export function updateTask(data) {
  return request({
    url: '/patient/advancedTask',
    method: 'put',
    data: data
  })
}

export function delTask(taskIds) {
  return request({
    url: '/patient/advancedTask/' + taskIds,
    method: 'delete'
  })
}

export function exportTask(query) {
  return request({
    url: '/patient/advancedTask/export',
    method: 'get',
    params: query
  })
}
export function getTaskByPatientId(patientId) {
  return request({
    url: '/patient/advancedTask/patientId/' + patientId,
    method: 'get'
  })
}
export function updateByPatientId(data) {
  return request({
    url: '/patient/advancedTask/updateByPatientId/',
    method: 'post',
    data: data
  })
}
export function getWorkstation(workstation,patientId) {
  return request({
    url: '/patient/advancedTask/getWorkstation/',
    method: 'get',
    params:{
      workstation:workstation,
      patientId:patientId,
    }
  })
}
