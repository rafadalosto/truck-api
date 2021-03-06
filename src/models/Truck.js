const { Model, DataTypes } = require('sequelize');

class Truck extends Model {
    static init(sequelize) {
        super.init({
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            plate: {
                type: DataTypes.STRING,
                allowNull: false
            },
            alias: DataTypes.STRING
        }, {
            hooks: {
                beforeSave: async truck => {
                    truck.plate = truck.plate.toLowerCase();
                },
                beforeUpdate: async truck => {
                    truck.plate = truck.plate.toLowerCase();
                }
            },
            sequelize
        });
    }

    static associate(models) {
        this.hasMany(models.TruckPosition, {foreignKey: 'truck_id', as: 'positions'});
    }
}

module.exports = Truck;