/// <reference types="cypress" />
// @ts-ignore
require("dotenv").config()

/**
 * @type {Cypress.PluginConfig}
 */

export default (on, config) => {
  config.env.siteURL = process.env.SITE_URL

  return config
}
