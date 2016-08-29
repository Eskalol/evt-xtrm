'use strict';

module.exports = require('./index')({
  passport: {
    enable: true,
    permissionSecurity: true,
    facebook: {
      enable: true,
      AppID: "1739022963015334",
      AppSecret: "1d4c2705545295207cc2257ccaa7b243"
    }
  }
});