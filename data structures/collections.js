let collection = {
    "user": [
        {
            "_id": "u0110",
            "username": "eliMal",
            "password": "theking",
            "name": "Eli Malchi",
            "loc": {
                "geo": {
                    "lat": 1.394772641,
                    "lng": 1.913746344
                },
                "city": "Tel Tabiv",
                "address": "harav goren st."
            },
            "phone": "0502202023",
            "email": "test@gmail.com"
        }
    ],
    "eventEra": [
        {
            "_id": "m011",
            "name": "FOOTBALL(NOT SOCCER)",
            "loc": {
                "geo": {
                    "lat": 1.394772641,
                    "lng": 1.913746344
                },
                "city": "Tel Tabiv",
                "address": "harav goren st."
            },
            "createdAt": 1562846469162,
            "expireAt": 1562846479162,
            "creator": {
                "_id": "u0110",
                "name": "Eli Malchi"
            },
            "categories": ["Sports"],
            "members": [
                {
                    "role": "Striker",
                    "mvpVoteCount": 0
                }
            ]
        }
    ]
}


// {
//     "_id": {
//       "$oid": "5d2706e7fc13ae4029000032"
//     },
//     "name": "Trude Mongeot",
//     "location": {
//       "geo": {
//         "lat": -9.5517,
//         "lng": 124.3173
//       },
//       "city": "Fatufaun",
//       "address": "067 Lukken Terrace"
//     },
//     "email": "tmongeot0@marketwatch.com",
//     "phone": "886-605-4945"
//   }
function jsonServerUserCollection(users) {
    return users.map(u => {
        let newU = Object.assign({}, u);
        newU._id = u._id.$oid;
        delete newU.lat
        delete newU.lng
        delete newU.address
        delete newU.city
        newU.loc = {
            geo: {
                lat: u.lat,
                lng: u.lng
            },
            address: u.address,
            city: u.city
        }
        return newU;
    });
}

function organizeUserCollection(users) {
    return users.map(u => {
        let newU = Object.assign({}, u);
        delete newU.lat
        delete newU.lng
        delete newU.address
        delete newU.city
        newU.loc = {
            geo: {
                lat: u.lat,
                lng: u.lng
            },
            address: u.address,
            city: u.city
        }
        return newU;
    })
} 