import express from "express";
const routes = express.Router();
import Deshboard from "../controller/admin_deshboard_controller";

const deshboard = new Deshboard();

routes.get("/", deshboard.gethomepage);

module.exports = routes;
