const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
require("dotenv").config();

module.exports = db = {};
module.exports.initialize = initialize;
initialize();


async function initialize() {
  try {
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT;
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const database = process.env.DB_DATABASE;

    // Create the database if it doesn't exist
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    const sequelize = new Sequelize(database, user, password, {
      port: port,
      host: host,
      dialect: "mysql",
      logging: false,
      timezone: "+05:30",
    });

    db.sequelize = sequelize;
    db.user = new (require("../models/user.model"))(sequelize);
    db.subscription_plans = new (require("../models/subscription.model"))(
      sequelize
    );

    db.payment_detail = new (require("../models/paymentDetails.model"))(
      sequelize
    );
    db.user_subscription = new (require("../models/userSubscription.model"))(
      sequelize
    );

    db.subscription_plans.hasMany(db.user_subscription, {
      foreignKey: "plan_id",
    });

    db.user.hasMany(db.subscription_plans, { foreignKey: "user_id" });

    await sequelize.sync();
  } catch (error) {
    console.log(error);
  }
}
