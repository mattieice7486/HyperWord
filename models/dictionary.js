module.exports = function(sequelize, DataTypes) {
  var Dictionary = sequelize.define("entries", {
    // Giving the Dictionary model a name of type STRING
    word: DataTypes.STRING,
    
    wordtype: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    definition: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }
  });

  // Dictionary.associate = function(models) {
    // Associating Dictionary with Posts
    // When an Dictionary is deleted, also delete any associated Posts
    // Dictionary.hasMany(models.Post, {
    //   onDelete: "cascade"
    // });
  // };

  return Dictionary;
};
