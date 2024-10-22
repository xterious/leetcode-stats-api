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
const assert_1 = __importDefault(require("assert"));
const app_1 = __importDefault(require("../app"));
describe('Problem Data Tests', () => {
    it('Should fetch the daily problem', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/daily');
        [
            'questionLink',
            'date',
            'questionId',
            'questionFrontendId',
            'questionTitle',
            'titleSlug',
            'difficulty',
            'isPaidOnly',
            'question',
            'exampleTestcases',
            'topicTags',
            'hints',
            'solution',
            'companyTagStats',
            'likes',
            'dislikes',
            'similarQuestions',
        ].forEach((key) => {
            (0, assert_1.default)(key in response.body);
        });
    }));
    it('Should fetch a list of problems', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/problems');
        ['totalQuestions', 'count', 'problemsetQuestionList'].forEach((key) => {
            (0, assert_1.default)(key in response.body);
        });
    }));
    it('Should Select a Problem', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/select?titleSlug=two-sum');
        [
            'link',
            'questionId',
            'questionFrontendId',
            'questionTitle',
            'titleSlug',
            'difficulty',
            'isPaidOnly',
            'question',
            'exampleTestcases',
            'topicTags',
            'hints',
            'solution',
            'companyTagStats',
            'likes',
            'dislikes',
            'similarQuestions',
        ].forEach((key) => (0, assert_1.default)(key in response.body));
    }));
});
//# sourceMappingURL=problemData.spec.js.map