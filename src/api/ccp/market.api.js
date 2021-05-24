const CoinMarketCap = require("../../mongo/models/coinMarketCap.model");

module.exports = {
  list: (params) => {
    return new Promise(async (resolve, reject) => {
      try {
        CoinMarketCap.find().then((docs) => {
          if (docs?.length) {
            resolve({
              ok: true,
              data: docs,
            });
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};
