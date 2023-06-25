"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../models/user"));
const enterprise_1 = __importDefault(require("../models/enterprise"));
const enterpriseRequest_1 = __importDefault(require("../models/enterpriseRequest"));
class RequestController {
    constructor() {
        this.deleteRequest = (req, res) => {
            let id = new mongoose_1.default.Types.ObjectId(req.body.id);
            enterpriseRequest_1.default.deleteOne({ '_id': id }, (err, r) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.approveRequest = (req, res) => {
            let id = new mongoose_1.default.Types.ObjectId(req.body.id);
            enterpriseRequest_1.default.findOne({ '_id': id }, (err, request) => {
                if (err)
                    console.log(err);
                else if (request) {
                    user_1.default.find({}, (err, users) => {
                        if (err)
                            console.log(err);
                        else {
                            let noviId = 1;
                            if (users.length > 0) {
                                users.sort((a, b) => {
                                    if (a.id < b.id) {
                                        return 1;
                                    }
                                    else {
                                        if (a.id == b.id) {
                                            return 0;
                                        }
                                        else {
                                            return -1;
                                        }
                                    }
                                });
                                noviId = users[0].id + 1;
                            }
                            let enterprise = new enterprise_1.default({
                                id: noviId,
                                ime: request.ime,
                                prezime: request.prezime,
                                username: request.username,
                                password: request.password,
                                telefon: request.telefon,
                                email: request.email,
                                nazivPreduzeca: request.nazivPreduzeca,
                                adresaPreduzeca: request.adresaPreduzeca,
                                pib: request.pib,
                                maticniBroj: request.maticniBroj,
                                logo: request.logo,
                                status: "Aktivan",
                                kategorija: "",
                                sifreDelatnosti: "",
                                uPDVsistemu: false,
                                ziroRacuni: "",
                                magacini: [],
                                kase: []
                            });
                            enterprise.save().then(request => { }).catch(err => {
                                console.log(err);
                            });
                            let user = new user_1.default({
                                id: noviId,
                                username: request.username,
                                password: request.password,
                                tip: 2
                            });
                            user.save().then(user => { }).catch(err => {
                                console.log(err);
                            });
                            enterpriseRequest_1.default.deleteOne({ '_id': id }, (err, r) => {
                                if (err)
                                    console.log(err);
                                else
                                    res.json({ 'message': 'ok' });
                            });
                        }
                    });
                }
            });
        };
    }
}
exports.RequestController = RequestController;
//# sourceMappingURL=request.controller.js.map