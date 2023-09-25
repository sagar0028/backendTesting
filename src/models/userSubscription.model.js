const { DataTypes } = require("sequelize");
const BaseAttributesModel = require("./common.model");

class Usersubscription {
  constructor(sequelize) {
    this.sequelize = sequelize;
    this.model = this.defineModel();
  }

  defineModel() {
    return this.sequelize.define("user_subscription", this.getAttributes());
  }

  getAttributes() {
    return {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      payment_due_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      plan_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ...BaseAttributesModel,
    };
  }
}

module.exports = Usersubscription;
