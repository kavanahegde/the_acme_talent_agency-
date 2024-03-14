
const {
    client,
    createTable,
    createProduct,
    createUser,
    fetchUsers,
    fetchProducts,
    createUserFavorite,
    fetchUserFavorites,
    deleteUserFavorite,
  } = require("./db");
  
  const express = require("express");
  const app = express();
  app.use(express.json());
  
  app.get("/api/users", async (req, res, next) => {
    try {
      const users = await fetchUsers();
      res.send(users);
    } catch (ex) {
      next(ex);
    }
  });
  
  app.get("/api/products", async (req, res, next) => {
    try {
      const products = await fetchProducts();
      res.send(products);
    } catch (ex) {
      next(ex);
    }
  });
  
  app.get("/api/favorites", async (req, res, next) => {
    try {
      const favorites = await fetchUserFavorites();
      res.send(favorites);
    } catch (ex) {
      next(ex);
    }
  });
  
  app.get("/api/users/:id/favorites", async (req, res, next) => {
    try {
      const favorites = await fetchUserFavorites(req.params.id);
      res.send(favorites);
    } catch (ex) {
      next(ex);
    }
  });
  
  app.post("/api/users/:id/favorites", async (req, res, next) => {
    try {
      const favorite = await createUserFavorite({
        user_id: req.params.id,
        productId: req.body.productId,
      });
      res.status(201).send(favorite);
    } catch (ex) {
      next(ex);
    }
  });
  
  app.delete("/api/users/:id/favorites", async (req, res, next) => {
    try {
      await deleteUserFavorite({
        user_id: req.params.id,
        productId: req.body.productId,
      });
      res.sendStatus(204);
    } catch (ex) {
      next(ex);
    }
  });
  
  const init = async () => {
    try {
      await client.connect();
      await createTable();
      console.log("Connected to database");
      console.log("Creating tables");
  
      const [
        kav,
        ram,
        pico,
        mac,
        phone,
        laptop,
      ] = await Promise.all([
        createUser({ username: "kav", password: "kav_pw" }),
        createUser({ username: "ram", password: "ram_pw" }),
        createUser({ username: "pico", password: "pico_pw" }),
        createProduct({ name: "mac" }),
        createProduct({ name: "Phone" }),
        createProduct({ name: "laptop" }),
      ]);
  
      console.log("Users created:", kav, ram, pico);
      console.log("Products created:", mac, phone, laptop);
  
      const userFav = await Promise.all([
        createUserFavorite({ user_id: kav.id, productId: mac.id }),
        createUserFavorite({ user_id: ram.id, productId: phone.id }),
        createUserFavorite({ user_id: pico.id, productId: laptop.id }),
      ]);
  
      console.log("Favorites created:", userFav);
  
      console.log("User favorites for kav:", await fetchUserFavorites(kav.id));
      console.log("User favorites for ram:", await fetchUserFavorites(ram.id));
  
      await deleteUserFavorite({ user_id: kav.id, productId: mac.id });
  
      const PORT = 3000;
      app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
    } catch (error) {
      console.error("Error initializing application:", error);
      process.exit(1); // Exit the process with a non-zero status code to indicate failure
    }
  };
  
  init();
  