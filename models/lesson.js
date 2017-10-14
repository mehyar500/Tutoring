module.exports = function(sequelize, DataTypes){
	var Lesson = sequelize.define("Lesson", {
		subject: {
			type: DataTypes.STRING,
			allowNull: false,
			validate:{
				len: [1]
			}

		},
		topic: {
			type: DataTypes.STRING,
			allowNull: false,
			validate:{
				len: [1]
			}
		},
		content: {
			type: DataTypes.STRING,
			allowNull: false,
			validate:{
				len:[1]
			}
		}
		// ,
		// quiz: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: false,
		// 	validate:{
		// 		len[1]
		// 	}
		// }
	});

	Lesson.associate = function(models){

		Lesson.hasMany(models.Quiz, {
			foreignKey:{
				allowNull:false
			}
		});
	};


	return Lesson;
}