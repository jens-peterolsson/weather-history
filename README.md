# weather-history

Prepare:

- npm i!
- prep smhi data
- env-file to switch db between local and prod
- verify script to start mongo + gui tool
- Doc for mongoose/mongo query, aggregate and date handling

b.CollectionNameGoesHere.aggregate({ $match: {
    $and: [
        { hour: { $gte: 11 } },
        { hour: { $lte: 12 } }
    ]
} },
{ $group: { _id : null, sum : { $sum: "$incoming" } } });