require("./db");
const app = require("./app");

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
