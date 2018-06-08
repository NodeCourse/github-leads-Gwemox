const program = require('commander');
const client = require('./client');
const getTrendingRepos = require('./getTrendingRepos');
const getStargazersForRepo = require('./getStargazersForRepo');
const flatten = require('array-flatten');
const csv = require('csv-stringify');
const fs = require('fs');
const path = require('path');

program
    .version('0.1.0')
    .option('-t, --token <token>', 'Github token')
    .option('-o, --output <path>', 'Path of output CSV')
    .option('-l, --languages [language,language2,...]', 'Languages', (value) => value.split(','))
    .parse(process.argv);

if (program.token && program.output) {
    client.authenticate({
        type: 'token',
        token: program.token
    });

    let date = new Date();
    date.setDate(date.getDate()-2)

    getTrendingRepos(program.languages, date)
        .then(repos => {
            Promise
                .all(repos.map(repo => getStargazersForRepo(repo.owner.login, repo.name)))
                .then(stargazers => flatten(stargazers))
                .then(stargazers => stargazers.map(stargazer => [stargazer.starred_at, stargazer.user.id, stargazer.user.login, stargazer.user.url]))
                .then(stargazers => {
                    csv(stargazers, (err, output) => {
                        fs.writeFile(program.output, output, (err) => {
                            if (err) throw err
                            console.log(`CSV successfully  saved at ${path.resolve(program.output)}`)
                        });
                    });
                })
                .catch(err => console.error(err));
        });
} else {
    console.error('Missing argument, please check --help');
}