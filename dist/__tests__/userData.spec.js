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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const assert_1 = __importDefault(require("assert"));
describe('User Data Tests', () => {
    it('should fetch a single user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/jambobjones');
        expect(response.body.username).toBe('jambobjones');
        [
            'username',
            'name',
            'birthday',
            'avatar',
            'ranking',
            'reputation',
            'gitHub',
            'twitter',
            'linkedIN',
            'website',
            'country',
            'company',
            'school',
            'skillTags',
            'about',
        ].forEach((key) => {
            (0, assert_1.default)(key in response.body);
        });
    }));
    it('should fetch user badges', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/jambobjones/badges');
        ['badgesCount', 'badges', 'upcomingBadges', 'activeBadge'].forEach((key) => {
            (0, assert_1.default)(key in response.body);
        });
    }));
    it('Should fetch users solved problems', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/jambobjones/solved');
        [
            'solvedProblem',
            'easySolved',
            'mediumSolved',
            'hardSolved',
            'totalSubmissionNum',
            'acSubmissionNum',
        ].forEach((key) => {
            (0, assert_1.default)(key in response.body);
        });
    }));
    it('Should fetch users contests', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/jambobjones/contest');
        ['contestParticipation'].forEach((key) => {
            (0, assert_1.default)(key in response.body);
        });
    }));
    it('Should fetch user contest history', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/jambobjones/contest/history');
        ['count', 'contestHistory'].forEach((key) => {
            (0, assert_1.default)(key in response.body);
        });
    }));
    it('Should fetch users recent submissions returning 20 by default', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/jambobjones/submission');
        ['count', 'submission'].forEach((key) => {
            (0, assert_1.default)(key in response.body);
        });
        expect(response.body.count).toBeLessThanOrEqual(20);
    }));
    // Todo: Submission test with Limit Parameter
    it('Should fetch AC Submissions', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/jambobjones/acSubmission');
        ['count', 'submission'].forEach((key) => {
            (0, assert_1.default)(key in response.body);
        });
        expect(response.body.count).toBeLessThanOrEqual(20);
    }));
    it('Should fetch Users Submission Calendar', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/jambobjones/calendar');
        (0, assert_1.default)('submissionCalendar' in response.body);
        expect(typeof response.body.submissionCalendar).toBe('string');
    }));
});
//# sourceMappingURL=userData.spec.js.map