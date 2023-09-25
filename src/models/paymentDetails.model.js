const { DataTypes, Sequelize } = require("sequelize");

class PaymentModel {
  constructor(sequelize) {
    this.sequelize = sequelize;
    this.model = this.defineModel();
  }

  defineModel() {
    return this.sequelize.define("payment_detail", this.getAttributes());
  }

  getAttributes() {
    return {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      subs_Plan_Id: { type: DataTypes.INTEGER, allowNull: false },
      payment_source: { type: DataTypes.STRING, allowNull: false },
      payment_timestamp_offset: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      payment_ref_no: { type: DataTypes.STRING, allowNull: false },
      payment_inv_id: { type: DataTypes.STRING },
      payment_method: { type: DataTypes.STRING, allowNull: false },
      txn_ref_no: { type: DataTypes.STRING, allowNull: false },
      txn_status: { type: DataTypes.STRING, allowNull: false },
      txn_date: { type: DataTypes.DATE },
      txn_currency: { type: DataTypes.STRING },
      txn_properties: { type: DataTypes.TEXT },
    };
  }
}

module.exports = PaymentModel;
