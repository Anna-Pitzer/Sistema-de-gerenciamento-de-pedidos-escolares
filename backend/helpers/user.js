"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.user = void 0;
var user = /** @class */ (function () {
    function user(token) {
        this.user = {
            id: NaN,
            username: '',
            name: '',
            levelaccess: NaN
        };
        this.token = {
            id: NaN,
            token: '',
            iduser: NaN,
            lastaccess: new Date('0000-00-00')
        };
        this.token.token = token;
        this.error = this.mountSession().catch(function (err) { return true; }).finally(function () { return false; });
    }
    user.prototype.mountSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mountToken().then(function (res) { return (true); }, function (err) {
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.mountUser().then(function (res) { return (true); }, function (err) {
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, false];
                }
            });
        });
    };
    user.prototype.mountToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tokenDB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('./../queries/tables/t_tokenuser')); })];
                    case 1: return [4 /*yield*/, (_a.sent()).t_tokenuser.read.readByToken({ token: this.token.token })];
                    case 2:
                        tokenDB = _a.sent();
                        this.token.id = tokenDB[0].id;
                        this.token.iduser = tokenDB[0].user;
                        this.token.lastaccess = tokenDB[0].lastaccess;
                        return [2 /*return*/];
                }
            });
        });
    };
    user.prototype.mountUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userDB;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('./../queries/tables/t_users')); })];
                    case 1: return [4 /*yield*/, (_a.sent()).t_users.read.readById({ id: this.token.iduser })];
                    case 2:
                        userDB = _a.sent();
                        this.user.id = userDB[0].id;
                        this.user.username = userDB[0].username;
                        this.user.name = userDB[0].name;
                        this.user.levelaccess = userDB[0].levelaccess;
                        return [2 /*return*/];
                }
            });
        });
    };
    user.prototype.checkSessionActive = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.error];
                    case 1:
                        if (_a.sent()) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    user.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.error];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.user];
                }
            });
        });
    };
    user.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var a;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.error];
                    case 1:
                        if (_a.sent()) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('./../queries/tables/t_tokenuser')); })];
                    case 2: return [4 /*yield*/, (_a.sent()).t_tokenuser.delete.deleteById({ id: this.token.id })];
                    case 3:
                        a = (_a.sent()) === 1;
                        return [2 /*return*/, a];
                }
            });
        });
    };
    user.prototype.changePassword = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.error];
                    case 1:
                        if (_a.sent()) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('./../queries/tables/t_users')); })];
                    case 2: return [4 /*yield*/, (_a.sent()).t_users.update.updatePassword({ id: this.user.id, password: password })];
                    case 3: return [2 /*return*/, (_a.sent()) === 1];
                }
            });
        });
    };
    return user;
}());
exports.user = user;
