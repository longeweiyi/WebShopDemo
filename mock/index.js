const Mock=require('mockjs')

Mock.mock(/^\/api\/products/,require('./products'))
Mock.mock('/api/cart', require('./cart'))
Mock.mock('/api/address', require('./address'))
Mock.mock('/api/pay', require('./pay'))
Mock.mock(/^\/api\/product/, require('./product'))
