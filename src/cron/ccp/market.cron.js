const { axiosApiInstance } = require("../../api/middleware/axios");

exports.fetchListing = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = process.env.SOURCE_URL;
      let result = await axiosApiInstance.post(url);
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
};
