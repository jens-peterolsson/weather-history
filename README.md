# weather-history

Prepare:

- setup local mongo in project
- add needed dependencies, checkout udemy app (tasks?)
- prep smhi data

- Doc for mongoose/mongo aggregate and date handling

b.CollectionNameGoesHere.aggregate({ $match: {
    $and: [
        { hour: { $gte: 11 } },
        { hour: { $lte: 12 } }
    ]
} },
{ $group: { _id : null, sum : { $sum: "$incoming" } } });