const { DataTypes } = require("sequelize");
const BaseAttributesModel = require("./common.model");

class UserModel {
  constructor(sequelize) {
    this.sequelize = sequelize;
    this.model = this.defineModel();
  }

  defineModel() {
    return this.sequelize.define("user", this.getAttributes());
  }

  getAttributes() {
    return {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      counterCode: { type: DataTypes.STRING },
      mobile: { type: DataTypes.BIGINT }
    };
  }
}

module.exports = UserModel;
