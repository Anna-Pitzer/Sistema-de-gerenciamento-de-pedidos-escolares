"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var login_1 = require("./controllers/login");
var logout_1 = require("./controllers/logout");
var products_1 = require("./controllers/products");
var providers_1 = require("./controllers/providers");
var schools_1 = require("./controllers/schools");
var order_1 = require("./controllers/order");
var consumption_1 = require("./controllers/consumption");
var verifySession_1 = require("./controllers/verifySession");
var myAcount_1 = require("./controllers/myAcount");
exports.router = (0, express_1.Router)();
var fnReturn = function (promise) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, promise.catch(function (err) {
                    console.error('[routes] Erro nao tratado:', err);
                    return ({ code: 500, msg: 'Erro interno do servidor' });
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.router.post("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c; return __generator(this, function (_d) {
    switch (_d.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, fnReturn(login_1.login.login((_c = req.body) === null || _c === void 0 ? void 0 : _c.data))];
        case 1: return [2 /*return*/, _b.apply(_a, [_d.sent()])];
    }
}); }); });
exports.router.post("/logout", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c, _d; return __generator(this, function (_e) {
    switch (_e.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, fnReturn(logout_1.logout.logout((_c = req.body) === null || _c === void 0 ? void 0 : _c.data, (_d = req.body) === null || _d === void 0 ? void 0 : _d.token))];
        case 1: return [2 /*return*/, _b.apply(_a, [_e.sent()])];
    }
}); }); });
exports.router.post("/verify-session", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c, _d; return __generator(this, function (_e) {
    switch (_e.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, fnReturn(verifySession_1.verifySession.verifySession((_c = req.body) === null || _c === void 0 ? void 0 : _c.data, (_d = req.body) === null || _d === void 0 ? void 0 : _d.token))];
        case 1: return [2 /*return*/, _b.apply(_a, [_e.sent()])];
    }
}); }); });
exports.router.post("/change-password", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c, _d; return __generator(this, function (_e) {
    switch (_e.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, fnReturn(myAcount_1.myAcount.updatePassword((_c = req.body) === null || _c === void 0 ? void 0 : _c.data, (_d = req.body) === null || _d === void 0 ? void 0 : _d.token))];
        case 1: return [2 /*return*/, _b.apply(_a, [_e.sent()])];
    }
}); }); });
exports.router.post("/schools/read", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c, _d; return __generator(this, function (_e) {
    switch (_e.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, fnReturn(schools_1.schools.read((_c = req.body) === null || _c === void 0 ? void 0 : _c.data, (_d = req.body) === null || _d === void 0 ? void 0 : _d.token))];
        case 1: return [2 /*return*/, _b.apply(_a, [_e.sent()])];
    }
}); }); });
exports.router.post("/schools/create", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c, _d; return __generator(this, function (_e) {
    switch (_e.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, fnReturn(schools_1.schools.create((_c = req.body) === null || _c === void 0 ? void 0 : _c.data, (_d = req.body) === null || _d === void 0 ? void 0 : _d.token))];
        case 1: return [2 /*return*/, _b.apply(_a, [_e.sent()])];
    }
}); }); });
exports.router.post("/schools/update", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c, _d; return __generator(this, function (_e) {
    switch (_e.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, fnReturn(schools_1.schools.update((_c = req.body) === null || _c === void 0 ? void 0 : _c.data, (_d = req.body) === null || _d === void 0 ? void 0 : _d.token))];
        case 1: return [2 /*return*/, _b.apply(_a, [_e.sent()])];
    }
}); }); });
exports.router.post("/consumption/read", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c, _d; return __generator(this, function (_e) {
    switch (_e.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, fnReturn(consumption_1.consumption.read((_c = req.body) === null || _c === void 0 ? void 0 : _c.data, (_d = req.body) === null || _d === void 0 ? void 0 : _d.token))];
        case 1: return [2 /*return*/, _b.apply(_a, [_e.sent()])];
    }
}); }); });
exports.router.post("/consumption/set", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c, _d; return __generator(this, function (_e) {
    switch (_e.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, fnReturn(consumption_1.consumption.set((_c = req.body) === null || _c === void 0 ? void 0 : _c.data, (_d = req.body) === null || _d === void 0 ? void 0 : _d.token))];
        case 1: return [2 /*return*/, _b.apply(_a, [_e.sent()])];
    }
}); }); });
exports.router.post("/providers/read", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c, _d; return __generator(this, function (_e) {
    switch (_e.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, fnReturn(providers_1.providers.read((_c = req.body) === null || _c === void 0 ? void 0 : _c.data, (_d = req.body) === null || _d === void 0 ? void 0 : _d.token))];
        case 1: return [2 /*return*/, _b.apply(_a, [_e.sent()])];
    }
}); }); });
exports.router.post("/providers/create", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c, _d; return __generator(this, function (_e) {
    switch (_e.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, fnReturn(providers_1.providers.create((_c = req.body) === null || _c === void 0 ? void 0 : _c.data, (_d = req.body) === null || _d === void 0 ? void 0 : _d.token))];
        case 1: return [2 /*return*/, _b.apply(_a, [_e.sent()])];
    }
}); }); });
exports.router.post("/providers/update", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c, _d; return __generator(this, function (_e) {
    switch (_e.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, fnReturn(providers_1.providers.update((_c = req.body) === null || _c === void 0 ? void 0 : _c.data, (_d = req.body) === null || _d === void 0 ? void 0 : _d.token))];
        case 1: return [2 /*return*/, _b.apply(_a, [_e.sent()])];
    }
}); }); });
exports.router.post("/providers/delete", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c, _d; return __generator(this, function (_e) {
    switch (_e.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, fnReturn(providers_1.providers.delete((_c = req.body) === null || _c === void 0 ? void 0 : _c.data, (_d = req.body) === null || _d === void 0 ? void 0 : _d.token))];
        case 1: return [2 /*return*/, _b.apply(_a, [_e.sent()])];
    }
}); }); });
exports.router.post("/products/read", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c, _d; return __generator(this, function (_e) {
    switch (_e.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, fnReturn(products_1.products.read((_c = req.body) === null || _c === void 0 ? void 0 : _c.data, (_d = req.body) === null || _d === void 0 ? void 0 : _d.token))];
        case 1: return [2 /*return*/, _b.apply(_a, [_e.sent()])];
    }
}); }); });
exports.router.post("/products/create", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c, _d; return __generator(this, function (_e) {
    switch (_e.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, fnReturn(products_1.products.create((_c = req.body) === null || _c === void 0 ? void 0 : _c.data, (_d = req.body) === null || _d === void 0 ? void 0 : _d.token))];
        case 1: return [2 /*return*/, _b.apply(_a, [_e.sent()])];
    }
}); }); });
exports.router.post("/products/update", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c, _d; return __generator(this, function (_e) {
    switch (_e.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, fnReturn(products_1.products.update((_c = req.body) === null || _c === void 0 ? void 0 : _c.data, (_d = req.body) === null || _d === void 0 ? void 0 : _d.token))];
        case 1: return [2 /*return*/, _b.apply(_a, [_e.sent()])];
    }
}); }); });
exports.router.post("/products/delete", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c, _d; return __generator(this, function (_e) {
    switch (_e.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, fnReturn(products_1.products.delete((_c = req.body) === null || _c === void 0 ? void 0 : _c.data, (_d = req.body) === null || _d === void 0 ? void 0 : _d.token))];
        case 1: return [2 /*return*/, _b.apply(_a, [_e.sent()])];
    }
}); }); });
exports.router.post("/order/read", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c, _d; return __generator(this, function (_e) {
    switch (_e.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, fnReturn(order_1.order.read((_c = req.body) === null || _c === void 0 ? void 0 : _c.data, (_d = req.body) === null || _d === void 0 ? void 0 : _d.token))];
        case 1: return [2 /*return*/, _b.apply(_a, [_e.sent()])];
    }
}); }); });
exports.router.post("/order/read-by-id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c, _d; return __generator(this, function (_e) {
    switch (_e.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, fnReturn(order_1.order.readById((_c = req.body) === null || _c === void 0 ? void 0 : _c.data, (_d = req.body) === null || _d === void 0 ? void 0 : _d.token))];
        case 1: return [2 /*return*/, _b.apply(_a, [_e.sent()])];
    }
}); }); });
exports.router.post("/order/read-by-pedido", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c, _d; return __generator(this, function (_e) {
    switch (_e.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, fnReturn(order_1.order.readByPedido((_c = req.body) === null || _c === void 0 ? void 0 : _c.data, (_d = req.body) === null || _d === void 0 ? void 0 : _d.token))];
        case 1: return [2 /*return*/, _b.apply(_a, [_e.sent()])];
    }
}); }); });
exports.router.post("/order/create", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c, _d; return __generator(this, function (_e) {
    switch (_e.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, fnReturn(order_1.order.create((_c = req.body) === null || _c === void 0 ? void 0 : _c.data, (_d = req.body) === null || _d === void 0 ? void 0 : _d.token))];
        case 1: return [2 /*return*/, _b.apply(_a, [_e.sent()])];
    }
}); }); });
exports.router.post("/order/update", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c, _d; return __generator(this, function (_e) {
    switch (_e.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, fnReturn(order_1.order.update((_c = req.body) === null || _c === void 0 ? void 0 : _c.data, (_d = req.body) === null || _d === void 0 ? void 0 : _d.token))];
        case 1: return [2 /*return*/, _b.apply(_a, [_e.sent()])];
    }
}); }); });
exports.router.post("/order/delete", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c, _d; return __generator(this, function (_e) {
    switch (_e.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, fnReturn(order_1.order.deleteOrder((_c = req.body) === null || _c === void 0 ? void 0 : _c.data, (_d = req.body) === null || _d === void 0 ? void 0 : _d.token))];
        case 1: return [2 /*return*/, _b.apply(_a, [_e.sent()])];
    }
}); }); });
exports.router.post("/order/finish", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c, _d; return __generator(this, function (_e) {
    switch (_e.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, fnReturn(order_1.order.finishOrder((_c = req.body) === null || _c === void 0 ? void 0 : _c.data, (_d = req.body) === null || _d === void 0 ? void 0 : _d.token))];
        case 1: return [2 /*return*/, _b.apply(_a, [_e.sent()])];
    }
}); }); });
exports.router.post("/order/espelho", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c, _d; return __generator(this, function (_e) {
    switch (_e.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, fnReturn(order_1.order.espelho((_c = req.body) === null || _c === void 0 ? void 0 : _c.data, (_d = req.body) === null || _d === void 0 ? void 0 : _d.token))];
        case 1: return [2 /*return*/, _b.apply(_a, [_e.sent()])];
    }
}); }); });
exports.router.post("/schools/delete", function (req, res) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; var _c, _d; return __generator(this, function (_e) {
    switch (_e.label) {
        case 0:
            _b = (_a = res).json;
            return [4 /*yield*/, fnReturn(schools_1.schools.delete((_c = req.body) === null || _c === void 0 ? void 0 : _c.data, (_d = req.body) === null || _d === void 0 ? void 0 : _d.token))];
        case 1: return [2 /*return*/, _b.apply(_a, [_e.sent()])];
    }
}); }); });
