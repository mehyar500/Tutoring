module.exports = function(sequelize, DataTypes){
	var Quiz = sequelize.define("Quiz", {
		subject: DataTypes.STRING,
		topic: DataTypes.STRING,
		// lesson: DataTypes.INTEGER//,
		//problems?
	});

	Quiz.associate = function(models){

		Quiz.belongsTo(models.Lesson, {
			foreignKey:{
				allowNull:false
			}
		});
	};
	return Quiz;
}