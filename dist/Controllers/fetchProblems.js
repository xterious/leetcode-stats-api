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
Object.defineProperty(exports, "__esModule", { value: true });
const fetchProblems = (options, // Mark parameters as optional
res, formatData, query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Set default limit to 1 if only skip is provided
        const limit = options.skip !== undefined && options.limit === undefined ? 1 : options.limit || 20;
        const skip = options.skip || 0; // Default to 0 if not provided
        const tags = options.tags ? options.tags.split(' ') : []; // Split tags or default to empty array
        const difficulty = options.difficulty || undefined; // difficulty has to be 'EASY', 'MEDIUM' or 'HARD'
        const response = yield fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Referer: 'https://leetcode.com',
            },
            body: JSON.stringify({
                query: query,
                variables: {
                    categorySlug: '',
                    skip,
                    limit,
                    filters: { tags,
                        difficulty
                    },
                },
            }),
        });
        console.log(response);
        const result = yield response.json();
        if (result.errors) {
            return res.status(400).json(result.errors); // Return errors with a 400 status code
        }
        return res.json(formatData(result.data));
    }
    catch (err) {
        console.error('Error: ', err);
        return res.status(500).json({ error: 'Internal server error' }); // Return a 500 status code for server errors
    }
});
exports.default = fetchProblems;
//# sourceMappingURL=fetchProblems.js.map