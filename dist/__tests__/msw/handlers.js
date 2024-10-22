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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlers = void 0;
const msw = __importStar(require("msw"));
const mockData_1 = require("./mockData");
exports.handlers = [
    msw.http.post('https://leetcode.com/graphql', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const test = yield ctx.request.json();
        const typed = test;
        if (typed.query.indexOf('getUserProfile') !== -1) {
            return msw.HttpResponse.json(mockData_1.singleUser);
        }
        if (typed.query.indexOf('getUserContestRanking') !== -1) {
            return msw.HttpResponse.json(mockData_1.singleUserContests);
        }
        if (typed.query.indexOf('getRecentSubmissions') !== -1) {
            return msw.HttpResponse.json(mockData_1.recentSubmissions);
        }
        if (typed.query.indexOf('getACSubmissions') !== -1) {
            return msw.HttpResponse.json(mockData_1.recentACSubmissions);
        }
        if (typed.query.indexOf('getDailyProblem') !== -1) {
            return msw.HttpResponse.json(mockData_1.dailyProblem);
        }
        if (typed.query.indexOf('getProblems') !== -1) {
            return msw.HttpResponse.json(mockData_1.problems);
        }
        if (typed.query.indexOf('selectProblem') !== -1) {
            return msw.HttpResponse.json(mockData_1.selectProblem);
        }
        return msw.HttpResponse.json({});
    })),
];
//# sourceMappingURL=handlers.js.map