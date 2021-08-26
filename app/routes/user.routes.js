const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

var router = require("express").Router();

module.exports = function(app) {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
      
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isAdmin, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );


 // routes user get post put delete 
  
  // Retrieve all user
  router.get(
    "/",
    //[authJwt.verifyToken, authJwt.isModeratorOrAdmin],
     controller.findAll
  );

  // Retrieve a single user with id
  router.get(
    "/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.findOne
  );

  // Update a user with id
  router.put(
    "/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.update
  );

  // Delete a user with id
  router.delete(
    "/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
  );

  // Delete all user
  router.delete(
    "/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteAll
  );

  app.use('/api/user', router);
  
};