import { Router } from "express";
import createUserController from "../../../modules/user/useCases/createUser/createUserController";

const router = Router();

router.post("/api/user", createUserController.createUser);

export default router;
