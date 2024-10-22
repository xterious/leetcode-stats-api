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
const fetchDataRawFormat = (options, res, query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Referer: 'https://leetcode.com',
            },
            body: JSON.stringify({
                query: query,
                variables: {
                    username: options.username,
                },
            }),
        });
        const result = yield response.json();
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
        }
        if (result.errors) {
            return res.send(result);
        }
        return res.json(result.data);
    }
    catch (err) {
        console.error('Error: ', err);
        return res.send(err);
    }
});
exports.default = fetchDataRawFormat;
//# sourceMappingURL=fetchDataRawFormat.js.map