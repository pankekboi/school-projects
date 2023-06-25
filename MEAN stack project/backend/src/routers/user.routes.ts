import express from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=> new UserController().getUser(req, res)
)

userRouter.route('/checkUsername').post(
    (req, res)=> new UserController().checkUsername(req, res)
)

userRouter.route('/register').post(
    (req, res)=> new UserController().register(req, res)
)

userRouter.route('/addCustomer').post(
    (req, res)=>new UserController().addCustomer(req, res)
)

userRouter.route('/addEnterprise').post(
    (req, res)=>new UserController().addEnterprise(req, res)
)

userRouter.route('/checkEmail').post(
    (req, res)=> new UserController().checkEmail(req, res)
)

userRouter.route('/getEnterpriseById').post(
    (req, res)=> new UserController().getEnterpriseById(req, res)
)

userRouter.route('/getEnterpriseByPIB').post(
    (req, res)=> new UserController().getEnterpriseByPIB(req, res)
)

userRouter.route('/getEnterprise').post(
    (req, res)=>new UserController().getEnterprise(req, res)
)

userRouter.route('/getAllEnterprises').get(
    (req, res)=> new UserController().getAllEnterprises(req, res)
)

userRouter.route('/getCustomer').post(
    (req, res)=>new UserController().getCustomer(req, res)
)

userRouter.route('/getAllRequests').get(
    (req, res)=>new UserController().getAllRequests(req, res)
)

userRouter.route('/updateEnterpriseData').post(
    (req, res)=> new UserController().updateEnterpriseData(req, res)
)

userRouter.route('/changePassword').post(
    (req, res)=> new UserController().changePassword(req, res)
)

userRouter.route('/getAllItems').post(
    (req, res)=>new UserController().getAllItems(req, res)
)

userRouter.route('/getAllItemsStorageLocations').post(
    (req, res)=>new UserController().getAllItemsStorageLocations(req, res)
)

userRouter.route('/addItem').post(
    (req, res)=> new UserController().addItem(req, res)
)

userRouter.route('/changeItem').post(
    (req, res)=> new UserController().changeItem(req, res)
)

userRouter.route('/removeItem').post(
    (req, res)=> new UserController().removeItem(req, res)
)

userRouter.route('/updateStorageState').post(
    (req, res)=> new UserController().updateStorageState(req, res)
)

userRouter.route('/updateStorageStateLocation').post(
    (req, res)=>new UserController().updateStorageStateLocation(req, res)
)

export default userRouter;