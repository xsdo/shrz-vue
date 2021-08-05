import request from '@/utils/request'

export function listTask(query) {
  return request({
    url: '/patient/intermediateTask/list',
    method: 'get',
    params: query
  })
}

export function getTask(taskId) {
  return request({
    url: '/patient/intermediateTask/' + taskId,
    method: 'get'
  })
}

export function addTask(data) {
  return request({
    url: '/patient/intermediateTask',
    method: 'post',
    data: data
  })
}

export function updateTask(data) {
  return request({
    url: '/patient/intermediateTask',
    method: 'put',
    data: data
  })
}

export function delTask(taskIds) {
  return request({
    url: '/patient/intermediateTask/' + taskIds,
    method: 'delete'
  })
}

export function exportTask(query) {
  return request({
    url: '/patient/intermediateTask/export',
    method: 'get',
    params: query
  })
}
export function getTaskByPatientId(patientId) {
    return request({
      url: '/patient/intermediateTask/patientId/' + patientId,
      method: 'get'
    })
  }
export function updateByPatientId(data) {
  return request({
    url: '/patient/intermediateTask/updateByPatientId/',
    method: 'post',
    data: data
  })
}
export function getWorkstation(workstation,patientId) {
  return request({
    url: '/patient/intermediateTask/getWorkstation/',
    method: 'get',
    params:{
      workstation:workstation,
      patientId:patientId,
    }
  })
}
