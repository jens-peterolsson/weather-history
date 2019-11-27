# weather-history

TODO:

- env-file to switch db between local and prod
- schedule updates from latest months?
- deploy with heroku?
- init station remotely?

b.CollectionNameGoesHere.aggregate({ $match: {
    $and: [
{ hour: { $gte: 11 } },
{ hour: { $lte: 12 } }
]
} },
{ $group: { _id : null, sum : { $sum: "\$incoming" } } });
