import request from '@/utils/request'

export function listTask(query) {
  return request({
    url: '/ipa/task/list',
    method: 'get',
    params: query
  })
}

export function getTask(taskId) {
  return request({
    url: '/ipa/task/' + taskId,
    method: 'get'
  })
}

export function addTask(data) {
  return request({
    url: '/ipa/task',
    method: 'post',
    data: data
  })
}

export function updateTask(data) {
  return request({
    url: '/ipa/task',
    method: 'put',
    data: data
  })
}

export function delTask(taskId) {
  return request({
    url: '/ipa/task/' + taskId,
    method: 'delete'
  })
}

export function exportTask(query) {
  return request({
    url: '/ipa/task/export',
    method: 'get',
    params: query
  })
}


export function updateByPatientId(data) {
  return request({
    url: '/ipa/task/updateByPatientId/',
    method: 'post',
    data: data
  })
}

export function getWorkstation(workstation,patientId) {
  return request({
    url: '/ipa/task/getWorkstation/',
    method: 'GET',
    params: {
      workstation: workstation,
      patientId: patientId,
    }
  })
}

export function downloadScale(data) {
  return request({
    url: '/ipa/task/downloadScale',
    method: 'post',
    data: data
  })
}
