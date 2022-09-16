const express = require("express");
const operation = express.Router();
const DB = require("./schema");
//********************************************************************************************************************************************************************** */
operation.get("/:id", async (req, res) => {
  const user = await DB.findOne({ _id: req.params.id });
  if (user) {
    res.send({
      notes: user.notes,
      name: user.name,
      username: user.username,
      email: user.email,
    });
  } else {
    res.send({ message: "no notes" });
  }
});
///********************************************************************************************************************************************************************** */
operation.post("/:insert", async (req, res) => {
  const notes = req.body;
  console.log(notes, "from insert");
  try {
    const data = await DB.findByIdAndUpdate(req.params.insert, {
      $push: {
        notes: [
          {
            title: notes.title,
            description: notes.description,
          },
        ],
      },
    });
    console.log(data);
    res.send("Sucessfull").status(200);
  } catch (err) {
    res.send(err).status(500);
    console.log(err);
  }
});
//*************************************************************************************************************************************************************************/
operation.delete("/:id/:delete", async (req, res) => {
  console.log(req.params.delete);
  try {
    const data = await DB.findByIdAndUpdate(req.params.id, {
      $pull: {
        notes: { _id: req.params.delete },
      },
    });
    res.send("delete").status(200);
    console.log(data);
  } catch (err) {
    res.send("Unable to delete").status(500);
    console.log(err);
  }
});
//**************************************************************************************************************************************************************************/
operation.put("/:id/:update", async (req, res) => {
  const notes = req.body;
  if (notes) {
    try {
      const data = await DB.findByIdAndUpdate(req.params.id);
      let arr = data.notes.filter((item) => {
        if (item._id == req.params.update) {
          return (
            (item.title = notes.title), (item.description = notes.description)
          );
        } else {
          return item.title, item.description;
        }
      });
      await DB.findByIdAndUpdate(req.params.id, {
        notes: arr,
      });
      res.send("Sucessfull").status(200);
      return;
    } catch (err) {
      res.send(err).status(500);
    }
  }
});
//********************************************************************************************************************************************************************************************** */
module.exports = operation;
