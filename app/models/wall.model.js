module.exports = (sequelize, Sequelize) => {
    const Wall = sequelize.define("walls", {
     username: {
        type: Sequelize.STRING
      },
      body: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      }
    });
  
    return Wall;
  };