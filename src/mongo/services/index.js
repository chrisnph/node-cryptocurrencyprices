const CoinMarketCap = require("../models/coinMarketCap.model");
const moment = require("moment");

exports.addListing = ({ data }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data[0]?.last_updated) resolve(null);

      let lastDoc = await CoinMarketCap.find().sort({ _id: -1 }).limit(1);

      if (lastDoc?.length) {
        let last_updated = moment(lastDoc[0]?.last_updated).format(
          "DD MMM YYYY HH:mm:ss"
        );
        let dataDateTime = moment(data[0].last_updated).format(
          "DD MMM YYYY HH:mm:ss"
        );

        if (dataDateTime > last_updated) {
          console.log("[Cron] newer data, inserting documents ...");
          data.forEach(async (_data, i) => {
            const newCoinMarketCap = new CoinMarketCap(_data);
            last_updated = await newCoinMarketCap.save().then((res) => {
              if (data.length === i + 1) {
                return res.last_updated;
              }
            });

            if (last_updated) resolve(last_updated);
          });
        } else {
          console.log("[Cron] No newer data, skipping ...");
        }
      } else {
        console.log("[Cron] no data, inserting documents ...");
        data.forEach(async (_data, i) => {
          const newCoinMarketCap = new CoinMarketCap(_data);
          last_updated = await newCoinMarketCap.save().then((res) => {
            if (data.length === i + 1) {
              return res.last_updated;
            }
          });

          if (last_updated) resolve(last_updated);
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};