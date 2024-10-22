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
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageStats = exports.trendingCategoryTopics = exports.problems = exports.selectProblem = exports.dailyProblem = exports.calendar = exports.acSubmission = exports.submission = exports.solvedProblem = exports.userContestHistory = exports.userContest = exports.userBadges = exports.userData = void 0;
const gqlQueries = __importStar(require("./GQLQueries"));
const formatUtils = __importStar(require("./FormatUtils"));
const controllers = __importStar(require("./Controllers"));
const userData = (req, res) => {
    controllers.fetchUserDetails(req.body, res, formatUtils.formatUserData, gqlQueries.userProfileQuery);
};
exports.userData = userData;
const userBadges = (req, res) => {
    controllers.fetchUserDetails(req.body, res, formatUtils.formatBadgesData, gqlQueries.userProfileQuery);
};
exports.userBadges = userBadges;
const userContest = (req, res) => {
    controllers.fetchUserDetails(req.body, res, formatUtils.formatContestData, gqlQueries.contestQuery);
};
exports.userContest = userContest;
const userContestHistory = (req, res) => {
    controllers.fetchUserDetails(req.body, res, formatUtils.formatContestHistoryData, gqlQueries.contestQuery);
};
exports.userContestHistory = userContestHistory;
const solvedProblem = (req, res) => {
    controllers.fetchUserDetails(req.body, res, formatUtils.formatSolvedProblemsData, gqlQueries.userProfileQuery);
};
exports.solvedProblem = solvedProblem;
const submission = (req, res) => {
    controllers.fetchUserDetails(req.body, res, formatUtils.formatSubmissionData, gqlQueries.submissionQuery);
};
exports.submission = submission;
const acSubmission = (req, res) => {
    controllers.fetchUserDetails(req.body, res, formatUtils.formatAcSubmissionData, gqlQueries.AcSubmissionQuery);
};
exports.acSubmission = acSubmission;
const calendar = (req, res) => {
    controllers.fetchUserDetails(req.body, res, formatUtils.formatSubmissionCalendarData, gqlQueries.userProfileQuery);
};
exports.calendar = calendar;
const dailyProblem = (_req, res) => {
    controllers.fetchSingleProblem(res, formatUtils.formatDailyData, gqlQueries.dailyProblemQuery, null);
};
exports.dailyProblem = dailyProblem;
const selectProblem = (req, res) => {
    const title = req.query.titleSlug;
    if (title !== undefined) {
        controllers.fetchSingleProblem(res, formatUtils.formatQuestionData, gqlQueries.selectProblemQuery, title);
    }
    else {
        res.status(400).json({
            error: 'Missing or invalid query parameter: titleSlug',
            solution: 'put query after select',
            example: 'localhost:3000/select?titleSlug=two-sum',
        });
    }
};
exports.selectProblem = selectProblem;
const problems = (req, res) => {
    const difficulty = req.query.difficulty;
    const limit = req.query.limit;
    const skip = req.query.skip;
    const tags = req.query.tags;
    controllers.fetchProblems({ limit, skip, tags, difficulty }, res, formatUtils.formatProblemsData, gqlQueries.problemListQuery);
};
exports.problems = problems;
const trendingCategoryTopics = (_req, res) => {
    const first = parseInt(_req.query.first);
    if (!isNaN(first)) {
        controllers.fetchTrendingTopics({ first }, res, formatUtils.formatTrendingCategoryTopicData, gqlQueries.trendingDiscussQuery);
    }
    else {
        res.status(400).json({
            error: 'Missing or invalid query parameter: limit',
            solution: 'put query after discussion',
            example: 'localhost:3000/trendingDiscuss?first=20',
        });
    }
};
exports.trendingCategoryTopics = trendingCategoryTopics;
const languageStats = (_req, res) => {
    const username = _req.query.username;
    if (username) {
        controllers.fetchDataRawFormat({ username }, res, gqlQueries.languageStatsQuery);
    }
    else {
        res.status(400).json({
            error: 'Missing or invalid query parameter: username',
            solution: 'put query after discussion',
            example: 'localhost:3000/languageStats?username=uwi',
        });
    }
};
exports.languageStats = languageStats;
//# sourceMappingURL=leetCode.js.map