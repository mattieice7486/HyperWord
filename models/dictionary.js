module.exports = function(sequelize, DataTypes) {
  var Dictionary = sequelize.define("entries", {
    // Giving the Dictionary model a name of type STRING
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Dictionary.associate = function(models) {
    // Associating Dictionary with Posts
    // When an Dictionary is deleted, also delete any associated Posts
    // Dictionary.hasMany(models.Post, {
    //   onDelete: "cascade"
    // });
  };

  return Dictionary;
};
