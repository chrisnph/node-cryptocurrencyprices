const { Schema, model } = require("mongoose");

const coinMarketCap = new Schema(
  {
    logo: String,
    rank: Number,
    last_updated: String,
    coin_id: String,
    watch_list: String,
    symbol: String,
    name: String,
    usd_price: String,
    usd_market_cap: String,
    usd_volume: String,
    price: Number,
    market_cap: Number,
    volume: Number,
    ath: Number,
    high_24h: Number,
    low_24h: Number,
    supply: String,
    percent_change_24h: String,
    percent_change_7d: String,
    percent_change_30d: String,
    percent_change_1y: String,
    ath_change_percentage: String,
    ath_date: String,
    weekly_chart: String,
  },
  {
    timestamps: true,
    collection: "coinMarketCap",
  }
);

const CoinMarketCap = model("coinMarketCap", coinMarketCap);
module.exports = CoinMarketCap;
