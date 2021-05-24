const { connect } = require("mongoose");
const market = require("./market.cron");
const mongoService = require("../../mongo/services");
const moment = require("moment");

require("dotenv").config();

const mongoURI = process.env.MONGODB_URL;

const handleAddListing = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await market.fetchListing();

      let last_updated = await mongoService
        .addListing(result)
        .then((res) => res);

      last_updated ? resolve(last_updated) : resolve(null);
    } catch (error) {
      reject(error);
    }
  });
};

connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(async () => {
  console.log("[Cron] connected to mongoDB");


  setInterval(async () => {
    console.log("\n[Cron] running interval check ...");
    last_updated = await handleAddListing();

    last_updated &&
      console.log(
        "[Cron] Last Updated",
        moment(last_updated).format("DD MMM YYYY HH:mm:ss")
      );
  }, process.env.SOURCE_INTERVAL);

  let last_updated = await handleAddListing();

});
