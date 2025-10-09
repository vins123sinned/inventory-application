import { Router } from "express";
import {
  getAuthentication,
  postAuthentication,
} from "../controllers/authenticationController.js";

const authenticationRouter = Router();

authenticationRouter.get("{*splat}/edit/{*splat}", getAuthentication);
authenticationRouter.post("/auth", postAuthentication);

export { authenticationRouter };
