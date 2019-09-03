module.exports = (sequelize , DataTypes) => {
    const authrole = sequelize.define('authrole',{
        authroleid : {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement : true,
            primaryKey: true
        } ,
        roleid: {
            type: DataTypes.INTEGER,
            references: {
              model: 'role',
              key: 'roleid'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
            unique: false
          },
          authid: {
            type: DataTypes.INTEGER,
            references: {
              model: 'auth',
              key:'authid'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
            unique: false
          }
    
    },{
        freezeTableName : true,
        timestamps: false
    });

    authrole.associate = (models) => {
      authrole.belongsTo(models.role, { foreignKey: 'roleid', targetKey: 'roleid'});
      authrole.belongsTo(models.auth, { foreignKey: 'authid', targetKey: 'authid'});
    }

    return authrole;
}
