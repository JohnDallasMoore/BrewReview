const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        post_text:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
       date_created:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        likes:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        rating:{
            type: DataTypes.DECIMAL(3,2),
            allowNull: false,
            defaultValue: 0
        },
        file_name:{
            type: DataTypes.STRING,
            allowNull: true
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
)

module.exports = Post;
