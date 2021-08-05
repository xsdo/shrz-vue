import request from '@/utils/request'

export function listStatisticsTable2(query) {
  return request({
    url: '/patient/statisticsTable2/list',
    method: 'get',
    params: query
  })
}

export function getStatisticsTable2(id) {
  return request({
    url: '/patient/statisticsTable2/' + id,
    method: 'get'
  })
}

export function addStatisticsTable2(data) {
  return request({
    url: '/patient/statisticsTable2',
    method: 'post',
    data: data
  })
}

export function updateStatisticsTable2(data) {
  return request({
    url: '/patient/statisticsTable2',
    method: 'put',
    data: data
  })
}

export function delStatisticsTable2(id) {
  return request({
    url: '/patient/statisticsTable2/' + id,
    method: 'delete'
  })
}

export function exportStatisticsTable2(query) {
  return request({
    url: '/patient/statisticsTable2/export',
    method: 'get',
    params: query
  })
}