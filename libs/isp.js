const { getLocale } = require('./intentHandlers')
/**
 * Check the product has been entitled
 * @param {object} product isp product object
 * @return {bool}
 * @since 0.11.0
 */
const isEntitled = (product) => product.entitled === 'ENTITLED'

/**
 * get all entitled products
 * @param {array} inSkillProductList
 * @return {array} entitled products
 * @since 0.11.0
 */
const getAllEntitledProducts = (inSkillProductList) => inSkillProductList.filter(record => isEntitled(record))

/**
 * Get entitled products
 * @param {object} handlerInput - from Alexa Skills Kit
 * @param {string} [defaultLocale='en-US'] - default locale
 * @return {array} entitled products
 * @since 0.11.0
 */
const getEntitledProducts = async (handlerInput, defaultLocale = 'en-US') => {
  const products = await getInSkillProducts(handlerInput, defaultLocale)
  return getAllEntitledProducts(products) || []
}

/**
 * Check the product can buy now
 * @param {object} product isp product object
 * @return {bool}
 * @since 0.11.0
 */
const isPurchasable = product => product.entitled === 'NOT_ENTITLED' && product.purchasable === 'PURCHASABLE'

/**
 * get all purchasable products
 * @param {array} inSkillProductList
 * @return {array} purchasable products
 * @since 0.11.0
 */
const getAllPurchasableProducts = (inSkillProductList) => inSkillProductList.filter(record => isPurchasable(record))

/**
 * Get purchasable products
 * @param {object} handlerInput - from Alexa Skills Kit
 * @param {string} [defaultLocale='en-US'] - default locale
 * @return {array} purchasable products
 * @since 0.11.0
 */
const getPurchasableProducts = async (handlerInput, defaultLocale = 'en-US') => {
  const products = await getInSkillProducts(handlerInput, defaultLocale)
  return getAllPurchasableProducts(products) || []
}

/**
 * Get in skill products
 * @param {object} handlerInput - from Alexa Skills Kit
 * @param {string} [defaultLocale='en-US'] - default locale
 * @return {array} products
 * @since 0.11.0
 */
const getInSkillProducts = async (handlerInput, defaultLocale = 'en-US') => {
  const locale = getLocale(handlerInput, defaultLocale)
  const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient()
  const res = await ms.getInSkillProducts(locale)
  return res.inSkillProducts || []
}

/**
 * Get speech text to tell product names.
 * @param {array} productsList - products
 * @return {string} product name string
 * @since 0.11.0
 */
const getSpeakableListOfProducts = (productLists) => {
  const validLists = productLists.filter(item => item.name)
  const productNameList = validLists.map(item => item.name)
  let productListSpeech = productNameList.join(', ')
  productListSpeech = productListSpeech.replace(/_([^_]*)$/, 'and $1')
  return productListSpeech
}

module.exports = {
  isEntitled,
  getAllEntitledProducts,
  getEntitledProducts,
  isPurchasable,
  getAllPurchasableProducts,
  getPurchasableProducts,
  getInSkillProducts,
  getSpeakableListOfProducts
}
