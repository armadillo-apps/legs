module.exports = {
  async up(db, client) {
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        await db.collection("users").insertOne({
          email: "baqa@thoughtworks.com",
          password:
            "$2a$10$h2O6.HvD8o6a5dPlL6U9FuxgBEdPLvqqBmu5HDxbVPWV4aTPhvrKq",
          role: "admin"
        });
      });
    } finally {
      await session.endSession();
    }
  }
};
