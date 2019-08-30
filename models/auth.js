'use strict';
module.exports = (sequelize, DataTypes) => {
  const auth = sequelize.define('auth', {
    authid: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    
    lastname: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }

  }, { 
    freezeTableName: true
  });
  auth.associate = function(models) {


  };
  return auth;
};