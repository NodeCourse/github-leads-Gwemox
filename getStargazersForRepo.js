const client = require('./client');
async function getStargazersForRepo(owner, repo) {
    try {
        let response = await client.activity.getStargazersForRepo({
            owner,
            repo
        });

        if (response.status !== 200) {
            throw "Bad response"
        }

        return response.data

    } catch (e) {
        console.error(e);
    }

    return [];
}

module.exports = getStargazersForRepo;