import request from '@/utils/request'

export function listType(query) {
  return request({
    url: '/patient/type/list',
    method: 'get',
    params: query
  })
}

export function getType(typeId) {
  return request({
    url: '/patient/type/' + typeId,
    method: 'get'
  })
}

export function addType(data) {
  return request({
    url: '/patient/type',
    method: 'post',
    data: data
  })
}

export function updateType(data) {
  return request({
    url: '/patient/type',
    method: 'put',
    data: data
  })
}

export function delType(typeId) {
  return request({
    url: '/patient/type/' + typeId,
    method: 'delete'
  })
}

export function exportType(query) {
  return request({
    url: '/patient/type/export',
    method: 'get',
    params: query
  })
}
export function treeselect() {
    return request({
      url: '/patient/type/treeselect',
      method: 'get'
    })
}
