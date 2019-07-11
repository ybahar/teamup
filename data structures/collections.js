let collection = {
    "user": [
        {
            "_id": "u0110",
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
            "loc" :{
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
            "category": ["Sports"],
            "members": [
                {
                    "role": "Striker",
                    "mvpVoteCount": 0
                }
            ]
        }
    ]
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