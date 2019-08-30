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
    freezeTableName : true
  });
  role.associate = function(models) {
    // associations can be defined here
  };
  return role;
};