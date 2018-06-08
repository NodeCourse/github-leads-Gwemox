exports.getQuery = (myParams) => {
    let query = [];
    Object.keys(myParams).forEach((option) => {
        query.push(
            ...myParams[option].map((quantifier) => {
                return `${option}:${quantifier}`
            })
        )
    });

    return query.join(' ');
}

exports.equal = (...args) => {
    return args.map((e) => e)
}

exports.greaterThan = (...args) => {
    return args.map((e) => `>${e}`)
}