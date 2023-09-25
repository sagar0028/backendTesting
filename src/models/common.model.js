const { DataTypes, Sequelize } = require("sequelize");

class BaseAttributesModel {
  constructor(sequelize) {
    this.sequelize = sequelize;
    this.model = this.defineModel();
  }

  defineModel() {
    return this.sequelize.define(
      "BaseAttributes",
      this.getAttributes(),
    );
  }

  getAttributes() {
    return {
      is_active: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: true },
      createdBy: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      createdAt: {
        type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), allowNull: false
      },
      updatedBy: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      updatedAt: {
        type: 'TIMESTAMP', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), allowNull: false
      },
    };
  }
}

module.exports = BaseAttributesModel;
