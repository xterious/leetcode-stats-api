"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectProblem = exports.problems = exports.dailyProblem = exports.singleUserContests = exports.recentACSubmissions = exports.recentSubmissions = exports.singleUser = void 0;
var singleUser_json_1 = require("./singleUser.json");
Object.defineProperty(exports, "singleUser", { enumerable: true, get: function () { return __importDefault(singleUser_json_1).default; } });
var recentSubmissions_json_1 = require("./recentSubmissions.json");
Object.defineProperty(exports, "recentSubmissions", { enumerable: true, get: function () { return __importDefault(recentSubmissions_json_1).default; } });
var recentAcSubmissionList_json_1 = require("./recentAcSubmissionList.json");
Object.defineProperty(exports, "recentACSubmissions", { enumerable: true, get: function () { return __importDefault(recentAcSubmissionList_json_1).default; } });
var singleUserContests_json_1 = require("./singleUserContests.json");
Object.defineProperty(exports, "singleUserContests", { enumerable: true, get: function () { return __importDefault(singleUserContests_json_1).default; } });
var dailyProblem_json_1 = require("./dailyProblem.json");
Object.defineProperty(exports, "dailyProblem", { enumerable: true, get: function () { return __importDefault(dailyProblem_json_1).default; } });
var problems_json_1 = require("./problems.json");
Object.defineProperty(exports, "problems", { enumerable: true, get: function () { return __importDefault(problems_json_1).default; } });
var selectProblem_json_1 = require("./selectProblem.json");
Object.defineProperty(exports, "selectProblem", { enumerable: true, get: function () { return __importDefault(selectProblem_json_1).default; } });
//# sourceMappingURL=index.js.map