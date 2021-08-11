const db = require("../models");
const Wall = db.wall;
const Op = db.Sequelize.Op;


exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
  
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};


//CRUD wall

exports.create = (req, res) => {

// Validate request
 if (!req.body.username ) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
   return;
 }

 // Create a Task
 const wall = {
   username: req.body.username,
   body: req.body.body,
   image: req.body.image
 };

 // Save Task in the database
 Wall.create(wall)
   .then(data => {
     //res.send(data, {message : "Wall sucess"});
     res.status(200).send(data);
     res.send({message : "Wall sucess"});
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while creating the wall."
     });
   });
};
 

exports.findAll = (req, res) => {

  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Wall.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving wall."
      });
    });
}

exports.findOne = (req, res) => {
  const id = req.params.id;

  Wall.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving wall with id=" + id
      });
    });
};

// Update a Task by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Wall.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "wall was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update wall with id=${id}. Maybe wall was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating wall with id=" + id
      });
    });
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Wall.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "wall was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete wall with id=${id}. Maybe wall was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete wall with id=" + id
      });
    });
};

// Delete all Task from the database.
exports.deleteAll = (req, res) => {
  Wall.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} wall were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all wall."
      });
    });
};