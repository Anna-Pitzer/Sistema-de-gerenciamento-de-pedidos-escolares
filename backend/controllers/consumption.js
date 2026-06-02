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
exports.consumption = void 0;
var consumption = /** @class */ (function () {
    function consumption() {
    }
    consumption.read = function (data, token) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('../helpers/user')); })];
                    case 1:
                        user = new (_b.sent()).user(token);
                        return [4 /*yield*/, user.checkSessionActive()];
                    case 2:
                        if (!(_b.sent())) {
                            return [2 /*return*/, {
                                    code: 200, msg: 'sessao inativa', res: false
                                }];
                        }
                        _a = {
                            code: 200, msg: ''
                        };
                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('../queries/tables/t_consumption')); })];
                    case 3: return [4 /*yield*/, (_b.sent()).t_consumption.read.read()];
                    case 4: return [2 /*return*/, (_a.res = _b.sent(),
                            _a)];
                }
            });
        });
    };
    consumption.set = function (data, token) {
        return __awaiter(this, void 0, void 0, function () {
            var user, date, countSuccess, codeKey, _i, _a, v, _b, _c, _d, verifyNumberInsert;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('../helpers/user')); })];
                    case 1:
                        user = new (_f.sent()).user(token);
                        return [4 /*yield*/, user.checkSessionActive()];
                    case 2:
                        if (!(_f.sent())) {
                            return [2 /*return*/, { code: 200, msg: 'sessao inativa', res: false }];
                        }
                        //Guard contra data ou data.list undefined
                        if (!data || !Array.isArray(data.list) || data.list.length === 0) {
                            return [2 /*return*/, { code: 400, msg: 'lista de consumo invalida', res: false }];
                        }
                        date = new Date();
                        countSuccess = 0;
                        codeKey = 'te-' + String((new Date()).toJSON());
                        _i = 0, _a = data.list;
                        _f.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 8];
                        v = _a[_i];
                        _b = countSuccess;
                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('../queries/tables/t_consumption')); })];
                    case 4:
                        _d = (_c = (_f.sent()).t_consumption.create).create;
                        _e = {
                            school: v.school, product: v.product, value: v.value,
                            datecreated: date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') +
                                '-' + String(date.getDate()).padStart(2, '0') + ' ' + String(date.getHours()).padStart(2, '0') + ':' +
                                String(date.getMinutes()).padStart(2, '0') + ':' + String(date.getSeconds()).padStart(2, '0')
                        };
                        return [4 /*yield*/, user.getData()];
                    case 5: return [4 /*yield*/, _d.apply(_c, [(_e.usercreated = (_f.sent()).id,
                                _e.sessionkey = codeKey,
                                _e)])];
                    case 6:
                        countSuccess = _b + ((_f.sent()) ? 1 : 0);
                        _f.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 3];
                    case 8:
                        verifyNumberInsert = countSuccess === data.list.length;
                        return [2 /*return*/, {
                                code: 200, msg: '', res: verifyNumberInsert
                            }];
                }
            });
        });
    };
    return consumption;
}());
exports.consumption = consumption;
