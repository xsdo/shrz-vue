import request from '@/utils/request'

export function listCategory(query) {
  return request({
    url: '/equip/category/list',
    method: 'get',
    params: query
  })
}

export function getCategory(id) {
  return request({
    url: '/equip/category/' + id,
    method: 'get'
  })
}

export function addCategory(data) {
  return request({
    url: '/equip/category',
    method: 'post',
    data: data
  })
}

export function updateCategory(data) {
  return request({
    url: '/equip/category',
    method: 'put',
    data: data
  })
}

export function delCategory(id) {
  return request({
    url: '/equip/category/' + id,
    method: 'delete'
  })
}

export function exportCategory(query) {
  return request({
    url: '/equip/category/export',
    method: 'get',
    params: query
  })
}

export function treeselect(query) {
  return request({
    url: '/equip/category/treeselect',
    method: 'get',
    params: query
  })
}