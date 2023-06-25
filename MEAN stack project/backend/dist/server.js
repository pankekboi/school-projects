"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const receipt_routes_1 = __importDefault(require("./routers/receipt.routes"));
const user_routes_1 = __importDefault(require("./routers/user.routes"));
const buyers_routes_1 = __importDefault(require("./routers/buyers.routes"));
const categories_routes_1 = __importDefault(require("./routers/categories.routes"));
const request_routes_1 = __importDefault(require("./routers/request.routes"));
const table_routes_1 = __importDefault(require("./routers/table.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/fiscalization');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connection ok');
});
const router = express_1.default.Router();
router.use('/receipts', receipt_routes_1.default);
router.use('/users', user_routes_1.default);
router.use('/buyers', buyers_routes_1.default);
router.use('/categories', categories_routes_1.default);
router.use('/requests', request_routes_1.default);
router.use('/tables', table_routes_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map