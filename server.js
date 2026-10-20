const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const usersRouter = require("./routes/users");

const app = express();

app.use(express.json());

app.use("/users", usersRouter);

// Swagger endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({
    message: "API is running"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger: http://localhost:${PORT}/api-docs`);
});