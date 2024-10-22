"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query = `
    query trendingDiscuss($first: Int!) {
        cachedTrendingCategoryTopics(first: $first) {
            id
            title
            post {
                id
                creationDate
                contentPreview
                author {
                    username
                    isActive
                    profile {
                        userAvatar
                    }
                }
            }
        }
    }
`;
exports.default = query;
//# sourceMappingURL=trendingDiscuss.js.map