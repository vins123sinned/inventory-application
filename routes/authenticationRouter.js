import { Router } from "express";
import { getAuthentication } from "../controllers/authenticationController.js";

const authenticationRouter = Router();

authenticationRouter.get("{*splat}/edit/{*splat}", getAuthentication);

export { authenticationRouter };
