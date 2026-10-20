const express = require("express");
const router = express.Router();

let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" }
];

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", (req, res) => {
  res.json(users);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      error: "User not found"
    });
  }

  res.json(user);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 */
router.post("/", (req, res) => {
  if (!req.body?.name) {
    return res.status(400).json({
      error: "Name is required"
    });
  }

  const user = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name: req.body.name
  };

  users.push(user);

  res.status(201).json(user);
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 */
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      error: "User not found"
    });
  }

  user.name = req.body.name;

  res.json(user);
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      error: "User not found"
    });
  }

  users = users.filter(u => u.id !== id);

  res.json({
    message: "User deleted"
  });
});

module.exports = router;