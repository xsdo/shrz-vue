import request from '@/utils/request'

export function listTask(query) {
  return request({
    url: '/patient/societyTask/list',
    method: 'get',
    params: query
  })
}

export function getTask(taskId) {
  return request({
    url: '/patient/societyTask/' + taskId,
    method: 'get'
  })
}

export function addTask(data) {
  return request({
    url: '/patient/societyTask',
    method: 'post',
    data: data
  })
}

export function updateTask(data) {
  return request({
    url: '/patient/societyTask',
    method: 'put',
    data: data
  })
}

export function delTask(taskIds) {
  return request({
    url: '/patient/societyTask/' + taskIds,
    method: 'delete'
  })
}

export function exportTask(query) {
  return request({
    url: '/patient/societyTask/export',
    method: 'get',
    params: query
  })
}
export function getTaskByPatientId(patientId) {
  return request({
    url: '/patient/societyTask/patientId/' + patientId,
    method: 'get'
  })
}
export function updateByPatientId(data) {
  return request({
    url: '/patient/societyTask/updateByPatientId/',
    method: 'post',
    data: data
  })
}
export function getWorkstation(workstation,patientId) {
  return request({
    url: '/patient/societyTask/getWorkstation/',
    method: 'GET',
    params:{
      workstation:workstation,
      patientId:patientId,
    }
  })
}
export function downloadScale(data) {
  return request({
    url: '/patient/societyTask/downloadScale',
    method: 'post',
    data: data
  })
}
