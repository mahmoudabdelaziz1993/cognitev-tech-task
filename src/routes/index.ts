import { Request,Response,Router } from 'express';
import { index } from '../controllers/index'
import { upload } from '../middlewares/multer'

/**
 * @constant {express.Router}
 */
const userController = new index();
 const router: Router = Router();
router.post("/first",upload.single("avatar"),userController.firstRegistration);
router.post("/second",userController.secondRegistration);
router.post("/third",userController.third);


module.exports = router ;