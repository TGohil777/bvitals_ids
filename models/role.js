'use strict';
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {

    roleid: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(200)
    },
    
  }, {
    freezeTableName : true,
    timestamps: false
  });
  role.associate = function(models) {
    role.belongsToMany(models.auth, {through: 'authrole', foreignKey: 'roleid', as: 'users'})
  };
 
  return role;
};