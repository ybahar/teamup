{
    "user": [
        {
            "_id": "u0110",
            "name": "Eli Malchi",
            "location": {
                "geoLoc": {
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
    "meetup": [
        {
            "_id": "m011",
            "name": "FOOTBALL(NOT SOCCER)",
            "location": {
                "geoLoc": {
                    "lat": 1.394772641,
                    "lng": 1.913746344
                },
                "city": "Tel Tabiv",
                "address": "harav goren st."
            },
            "isOpen": true,
            "creator": "u101",
            "category": "Sports",
            "members": [
                {
                    "role": "Striker",
                    "mvpVoteCount": 0,
                    "hasVoted": false
                }
            ]
        }
    ]
}


function organizeUserCollection (users){
    return users.map(u=> {
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