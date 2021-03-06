const testUtils = require('./libs/testUtils')
const intentHandlers = require('./libs/intentHandlers')
const randomResponse = require('./libs/randomResponse')
const slotManager = require('./libs/slotManager')
const systemDevice = require('./libs/system/device')
const systemUsers = require('./libs/system/users')
const response = require('./libs/response')
const isp = require('./libs/isp')
const progressive = require('./libs/progressiveResponse')
const interceptors = require('./libs/interceptors')
const Translations = require('./libs/classes/translations')
const deprecated = {
  intentHandlers,
  randomResponse,
  slotManager
}
const funcs = Object.assign(
  intentHandlers,
  randomResponse,
  slotManager,
  response,
  isp,
  interceptors,
  progressive
)
const systems = Object.assign(systemDevice, systemUsers, {})
systems.Translations = Translations

module.exports = Object.assign(testUtils, systems, funcs, deprecated)
