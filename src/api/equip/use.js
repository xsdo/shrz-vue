import request from '@/utils/request'

export function listUse(query) {
  return request({
    url: '/equip/use/list',
    method: 'get',
    params: query
  })
}

export function getOneList(query) {
  return request({
    url: '/equip/use/getOneProductlist',
    method: 'get',
    params: query
  })
}

export function getThisGrUselist(query) {
  return request({
    url: '/equip/use/getThisGrUselist',
    method: 'get',
    params: query
  })
}

export function getThisGgUselist(query) {
  return request({
    url: '/equip/use/getThisGgUselist',
    method: 'get',
    params: query
  })
}


export function getThisDeptGrUselist(query) {
  return request({
    url: '/equip/use/getThisDeptGrUselist',
    method: 'get',
    params: query
  })
}

export function getThisDeptGgUselist(query) {
  return request({
    url: '/equip/use/getThisDeptGgUselist',
    method: 'get',
    params: query
  })
}


export function getUse(useId) {
  return request({
    url: '/equip/use/' + useId,
    method: 'get'
  })
}

export function addUse(data) {
  return request({
    url: '/equip/use',
    method: 'post',
    data: data
  })
}

export function updateUse(data) {
  return request({
    url: '/equip/use',
    method: 'put',
    data: data
  })
}

export function delUse(useId) {
  return request({
    url: '/equip/use/' + useId,
    method: 'delete'
  })
}

export function exportUse(query) {
  return request({
    url: '/equip/use/export',
    method: 'get',
    params: query
  })
}