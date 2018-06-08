const { getQuery, equal, greaterThan } = require('./getQuery');
const client = require('./client');
const getDateFormat = require('./dateFormat');

async function getTrendingRepos(languages, created) {
    try {
        let response = await client.search.repos({
            q : getQuery({
                language : equal(...languages),
                created : greaterThan(getDateFormat(created))
            }),
            sort : 'stars'
        });

        if (response.status !== 200) {
            throw "Bad response"
        }

        return response.data.items

    } catch (e) {
        console.error(e);
    }

    return [];
}

module.exports = getTrendingRepos;