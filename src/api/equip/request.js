import request from '@/utils/request'

export function listRequest(query) {
  return request({
    url: '/equip/request/list',
    method: 'get',
    params: query
  })
}

export function listDetailRequest(query) {
  return request({
    url: '/equip/detail/getList',
    method: 'get',
    params: query
  })
}


export function getRequest(requestId) {
  return request({
    url: '/equip/request/' + requestId,
    method: 'get'
  })
}

export function toRepeal(requestId) {
  return request({
    url: '/equip/request/repeal' + requestId,
    method: 'post'
  })
}


export function toReport(requestId) {
  return request({
    url: '/equip/request/report' + requestId,
    method: 'post'
  })
}

export function addRequest(data) {
  return request({
    url: '/equip/request',
    method: 'post',
    data: data
  })
}

export function updateRequest(data) {
  return request({
    url: '/equip/request',
    method: 'put',
    data: data
  })
}

export function delRequest(requestId) {
  return request({
    url: '/equip/request/' + requestId,
    method: 'delete'
  })
}

export function exportRequest(query) {
  return request({
    url: '/equip/request/export',
    method: 'get',
    params: query
  })
}