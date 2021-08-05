import request from '@/utils/request'

export function listTask(query) {
  return request({
    url: '/peri/task/list',
    method: 'get',
    params: query
  })
}

export function getTask(taskId) {
  return request({
    url: '/peri/task/' + taskId,
    method: 'get'
  })
}

export function addTask(data) {
  return request({
    url: '/peri/task',
    method: 'post',
    data: data
  })
}

export function updateTask(data) {
  return request({
    url: '/peri/task',
    method: 'put',
    data: data
  })
}

export function delTask(taskId) {
  return request({
    url: '/peri/task/' + taskId,
    method: 'delete'
  })
}

export function exportTask(query) {
  return request({
    url: '/peri/task/export',
    method: 'get',
    params: query
  })
}


export function updateByPatientId(data) {
  return request({
    url: '/peri/task/updateByPatientId/',
    method: 'post',
    data: data
  })
}

export function getWorkstation(workstation,patientId) {
  return request({
    url: '/peri/task/getWorkstation/',
    method: 'GET',
    params: {
      workstation: workstation,
      patientId: patientId,
    }
  })
}
