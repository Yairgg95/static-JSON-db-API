const { Router } = require("express");
const usersControllers = require("../controllers/usersControllers");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await usersControllers.getAllUsers();
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await usersControllers.getUserById(id);
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  const data = req.body;
  try {
    const user = await usersControllers.createUser(data);
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedUser = await usersControllers.updatedUserByID(id, data);
    res.json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await usersControllers.deleteUserByid(id);
    res.json({
      success: true,
      data: deletedUser,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
