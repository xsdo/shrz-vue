import request from '@/utils/request'

export function listStatisticsTable3(query) {
  return request({
    url: '/patient/statisticsTable3/list',
    method: 'get',
    params: query
  })
}

export function getStatisticsTable3(id) {
  return request({
    url: '/patient/statisticsTable3/' + id,
    method: 'get'
  })
}

export function addStatisticsTable3(data) {
  return request({
    url: '/patient/statisticsTable3',
    method: 'post',
    data: data
  })
}

export function updateStatisticsTable3(data) {
  return request({
    url: '/patient/statisticsTable3',
    method: 'put',
    data: data
  })
}

export function delStatisticsTable3(id) {
  return request({
    url: '/patient/statisticsTable3/' + id,
    method: 'delete'
  })
}

export function exportStatisticsTable3(query) {
  return request({
    url: '/patient/statisticsTable3/export',
    method: 'get',
    params: query
  })
}