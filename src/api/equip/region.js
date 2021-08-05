import request from '@/utils/request'

export function listRegion(query) {
  return request({
    url: '/equip/region/list',
    method: 'get',
    params: query
  })
}

export function getRegion(id) {
  return request({
    url: '/equip/region/' + id,
    method: 'get'
  })
}

export function addRegion(data) {
  return request({
    url: '/equip/region',
    method: 'post',
    data: data
  })
}

export function updateRegion(data) {
  return request({
    url: '/equip/region',
    method: 'put',
    data: data
  })
}

export function delRegion(id) {
  return request({
    url: '/equip/region/' + id,
    method: 'delete'
  })
}

export function exportRegion(query) {
  return request({
    url: '/equip/region/export',
    method: 'get',
    params: query
  })

}

export function treeselect() {
  return request({
    url: '/equip/region/treeselect',
    method: 'get'
  })
}
