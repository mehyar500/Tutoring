module.exports = function(sequelize, DataTypes){
	var UserProblem = sequelize.define("UserProblem", {
		// subject: DataTypes.STRING,
		// topic: DataTypes.STRING,
		// lesson: DataTypes.INTEGER//,
		correct: DataTypes.BOOLEAN,
		question: DataTypes.STRING,
		correctAnswer: DataTypes.STRING
	});

	UserProblem.associate = function(models){

		UserProblem.belongsTo(models.Quiz, {
			foreignKey:{
				allowNull:false
			}
		});
		UserProblem.belongsTo(models.User, {
			foreignKey:{
				allowNull:false
			}
		});
		UserProblem.belongsTo(models.Problem, {
			foreignKey:{
				allowNull:false
			}
		});
		
	};
	return UserProblem;
}