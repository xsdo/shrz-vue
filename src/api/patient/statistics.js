import request from '@/utils/request'

export function listStatisticsTable1(query) {
  return request({
    url: '/patient/statisticsTable1/list',
    method: 'get',
    params: query
  })
}

export function getStatisticsTable1(id) {
  return request({
    url: '/patient/statisticsTable1/' + id,
    method: 'get'
  })
}

export function addStatisticsTable1(data) {
  return request({
    url: '/patient/statisticsTable1',
    method: 'post',
    data: data
  })
}

export function updateStatisticsTable1(data) {
  return request({
    url: '/patient/statisticsTable1',
    method: 'put',
    data: data
  })
}

export function delStatisticsTable1(id) {
  return request({
    url: '/patient/statisticsTable1/' + id,
    method: 'delete'
  })
}

export function exportStatisticsTable1(query) {
  return request({
    url: '/patient/statisticsTable1/export',
    method: 'get',
    params: query
  })
}
export function exportScaleLog() {
  return request({
    url: '/patient/statisticsTable1/dldExport',
    method: 'get',
  })
}
