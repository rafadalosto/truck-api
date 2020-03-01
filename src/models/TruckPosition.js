const { Model, DataTypes } = require('sequelize');

class TruckPosition extends Model {
    static init(sequelize) {
        super.init({
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            position: {
                type: DataTypes.GEOMETRY('POINT'),
                allowNull: false
            }
        }, {
            sequelize
        });
    }

    static associate(models) {
        this.belongsTo(models.Truck, {foreignKey: 'truck_id', as: 'truck'});
    }
}

module.exports = TruckPosition;