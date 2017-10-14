module.exports = function(sequelize, DataTypes){
	var Problem = sequelize.define("Problem", {
		question: DataTypes.STRING,
		choices: DataTypes.STRING,
		correctAnswer: DataTypes.STRING
		// lesson: DataTypes.INTEGER//,
		//problems?
	});

	Problem.associate = function(models){

		Problem.belongsTo(models.Quiz, {
			foreignKey:{
				allowNull:false
			}
		});
	};
	return Problem;
}