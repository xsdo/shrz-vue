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
//下载表格
export function exportDldLog() {
  return request({
    url: '/patient/statisticsTable1/exportDldLog',
    method: 'get',
    params: {}
  })
}
export function exportIricLog() {
  return request({
    url: '/patient/statisticsTable1/exportIricLog',
    method: 'get',
    params: {}
  })
}export function exportEisLog() {
  return request({
    url: '/patient/statisticsTable1/exportEisLog',
    method: 'get',
    params: {}
  })
}export function exportMettLog() {
  return request({
    url: '/patient/statisticsTable1/exportMettLog',
    method: 'get',
    params: {}
  })
}export function exportFzyqLog() {
  return request({
    url: '/patient/statisticsTable1/exportFzyqLog',
    method: 'get',
    params: {}
  })
}export function exportShtlLog() {
  return request({
    url: '/patient/statisticsTable1/exportShtlLog',
    method: 'get',
    params: {}
  })
}export function exportSysbLog() {
  return request({
    url: '/patient/statisticsTable1/exportSysbLog',
    method: 'get',
    params: {}
  })
}