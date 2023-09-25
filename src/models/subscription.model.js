const { DataTypes } = require("sequelize");
const BaseAttributesModel = require("./common.model");

class subscriptionPlans {
  constructor(sequelize) {
    this.sequelize = sequelize;
    this.model = this.defineModel();
  }

  defineModel() {
    return this.sequelize.define("subscription_plans", this.getAttributes());
  }

  getAttributes() {
    return {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      subscription_plan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: { type: DataTypes.INTEGER },
      // duration: {type: DataTypes.ENUM("daily", "weekly", "monthly", "yearly"), allowNull :false  },
      duration :{type:DataTypes.STRING},
      payment_time: { type: DataTypes.TIME, allowNull: false },
      ...BaseAttributesModel,
    };
  }
}

module.exports = subscriptionPlans;
