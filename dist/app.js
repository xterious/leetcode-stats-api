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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const leetcode = __importStar(require("./leetCode"));
const apicache_1 = __importDefault(require("apicache"));
const axios_1 = __importDefault(require("axios"));
const newQueries_1 = require("./GQLQueries/newQueries");
const app = (0, express_1.default)();
let cache = apicache_1.default.middleware;
const API_URL = process.env.LEETCODE_API_URL || 'https://leetcode.com/graphql';
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000, // 1 hour
    limit: 60,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: 'Too many request from this IP, try again in 1 hour',
});
app.use(cache('5 minutes'));
app.use((0, cors_1.default)()); //enable all CORS request
app.use(limiter); //limit to all API
app.use((req, _res, next) => {
    console.log('Requested URL:', req.originalUrl);
    next();
});
function queryLeetCodeAPI(query, variables) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post(API_URL, { query, variables });
            if (response.data.errors) {
                throw new Error(response.data.errors[0].message);
            }
            return response.data;
        }
        catch (error) {
            if (error.response) {
                throw new Error(`Error from LeetCode API: ${error.response.data}`);
            }
            else if (error.request) {
                throw new Error('No response received from LeetCode API');
            }
            else {
                throw new Error(`Error in setting up the request: ${error.message}`);
            }
        }
    });
}
app.get('/', (_req, res) => {
    res.json({
        apiOverview: 'Welcome to the Leetcode-API! Leetcode-Api is a custom solution born out of the need for a well-documented and detailed LeetCode API. This project is designed to provide developers with endpoints that offer insights into a user"s profile, badges, solved questions, contest details, contest history, submissions, and also daily questions, selected problem, list of problems.',
        routes: {
            userDetails: {
                description: 'Endpoints for retrieving detailed user profile information on Leetcode.',
                Method: 'GET',
                '/:username': 'Get your leetcodevis profile Details',
                '/:username/badges': 'Get your badges',
                '/:username/solved': 'Get total number of question you solved',
                '/:username/contest': 'Get your contest details',
                '/:username/contest/history': 'Get all contest history',
                '/:username/submission': 'Get your last 20 submission',
                '/:username/acSubmission': 'Get your last 20 accepted submission',
                '/:username/calendar': 'Get your submission calendar',
                '/userProfile/:username': 'Get full profile details in one call',
                '/userProfileCalendar?username=yourname&year=2024': 'Get your calendar details with year',
                '/languageStats?username=yourname': 'Get the language stats of a user',
                '/userProfileUserQuestionProgressV2/:userSlug': 'Get your question progress',
                '/skillStats/:username': 'Get your skill stats',
            },
            contest: {
                description: 'Endpoints for retrieving contest ranking and performance data.',
                Method: 'GET',
                '/userContestRankingInfo/:username': 'Get user contest ranking info',
            },
            discussion: {
                description: 'Endpoints for fetching discussion topics and comments.',
                Method: 'GET',
                '/trendingDiscuss?first=20': 'Get top 20 trending discussions',
                '/discussTopic/:topicId': 'Get discussion topic',
                '/discussComments/:topicId': 'Get discussion comments',
            },
            problems: {
                description: 'Endpoints for fetching problem-related data, including lists, details, and solutions.',
                Method: 'GET',
                singleProblem: {
                    '/select?titleSlug=two-sum': 'Get selected Problem',
                    '/daily': 'Get daily Problem',
                    '/dailyQuestion': 'Get raw daily question',
                },
                problemList: {
                    '/problems': 'Get list of 20 problems',
                    '/problems?limit=50': 'Get list of some problems',
                    '/problems?tags=array+math': 'Get list problems on selected topics',
                    '/problems?tags=array+math+string&limit=5': 'Get list some problems on selected topics',
                    '/officialSolution?titleSlug=two-sum': 'Get official solution of selected problem',
                },
            },
        },
    });
});
app.get('/officialSolution', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titleSlug } = req.query;
    if (!titleSlug) {
        return res.status(400).json({ error: 'Missing titleSlug query parameter' });
    }
    try {
        const data = yield queryLeetCodeAPI(newQueries_1.officialSolutionQuery, { titleSlug });
        return res.json(data);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}));
app.get('/userProfileCalendar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, year } = req.query;
    if (!username || !year || typeof year !== 'string') {
        return res
            .status(400)
            .json({ error: 'Missing or invalid username or year query parameter' });
    }
    try {
        const data = yield queryLeetCodeAPI(newQueries_1.userProfileCalendarQuery, {
            username,
            year: parseInt(year),
        });
        return res.json(data);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}));
// Format data
const formatData = (data) => {
    return {
        totalSolved: data.matchedUser.submitStats.acSubmissionNum[0].count,
        totalSubmissions: data.matchedUser.submitStats.totalSubmissionNum,
        totalQuestions: data.allQuestionsCount[0].count,
        easySolved: data.matchedUser.submitStats.acSubmissionNum[1].count,
        totalEasy: data.allQuestionsCount[1].count,
        mediumSolved: data.matchedUser.submitStats.acSubmissionNum[2].count,
        totalMedium: data.allQuestionsCount[2].count,
        hardSolved: data.matchedUser.submitStats.acSubmissionNum[3].count,
        totalHard: data.allQuestionsCount[3].count,
        ranking: data.matchedUser.profile.ranking,
        contributionPoint: data.matchedUser.contributions.points,
        reputation: data.matchedUser.profile.reputation,
        submissionCalendar: JSON.parse(data.matchedUser.submissionCalendar),
        recentSubmissions: data.recentSubmissionList,
        matchedUserStats: data.matchedUser.submitStats,
    };
};
app.get('/userProfile/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.params.id;
    try {
        const data = yield queryLeetCodeAPI(newQueries_1.getUserProfileQuery, {
            username: user,
        });
        if (data.errors) {
            res.send(data);
        }
        else {
            res.send(formatData(data.data));
        }
    }
    catch (error) {
        res.send(error);
    }
}));
const handleRequest = (res, query, params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield queryLeetCodeAPI(query, params);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/dailyQuestion', (_, res) => {
    handleRequest(res, newQueries_1.dailyQeustion, {});
});
app.get('/skillStats/:username', (req, res) => {
    const { username } = req.params;
    handleRequest(res, newQueries_1.skillStatsQuery, { username });
});
app.get('/userProfileUserQuestionProgressV2/:userSlug', (req, res) => {
    const { userSlug } = req.params;
    handleRequest(res, newQueries_1.userProfileUserQuestionProgressV2Query, { userSlug });
});
app.get('/discussTopic/:topicId', (req, res) => {
    const topicId = parseInt(req.params.topicId);
    handleRequest(res, newQueries_1.discussTopicQuery, { topicId });
});
app.get('/discussComments/:topicId', (req, res) => {
    const topicId = parseInt(req.params.topicId);
    const { orderBy = 'newest_to_oldest', pageNo = 1, numPerPage = 10, } = req.query;
    handleRequest(res, newQueries_1.discussCommentsQuery, {
        topicId,
        orderBy,
        pageNo,
        numPerPage,
    });
});
app.get('/userContestRankingInfo/:username', (req, res) => {
    const { username } = req.params;
    handleRequest(res, newQueries_1.userContestRankingInfoQuery, { username });
});
//get the daily leetCode problem
app.get('/daily', leetcode.dailyProblem);
//get the selected question
app.get('/select', leetcode.selectProblem);
//get list of problems
app.get('/problems', leetcode.problems);
//get 20 trending Discuss
app.get('/trendingDiscuss', leetcode.trendingCategoryTopics);
app.get('/languageStats', leetcode.languageStats);
// Construct options object on all user routes.
app.use('/:username*', (req, _res, next) => {
    req.body = {
        username: req.params.username,
        limit: req.query.limit,
    };
    next();
});
//get user profile details
app.get('/:username', leetcode.userData);
app.get('/:username/badges', leetcode.userBadges);
app.get('/:username/solved', leetcode.solvedProblem);
app.get('/:username/contest', leetcode.userContest);
app.get('/:username/contest/history', leetcode.userContestHistory);
app.get('/:username/submission', leetcode.submission);
app.get('/:username/acSubmission', leetcode.acSubmission);
app.get('/:username/calendar', leetcode.calendar);
exports.default = app;
//# sourceMappingURL=app.js.map