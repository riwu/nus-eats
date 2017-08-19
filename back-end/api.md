FORMAT: 1A

# Group Canteens

## All Canteens [/canteens]

### Retrieve all Canteens [GET]

+ Request JSON

    + Headers
    
        Authorization: Bearer <jwt>
        Accept: application/json

+ Response 200 (application/json)

    + Body

        {
            "canteens": [
                {
                    "id": 1,
                    "name": "Techno Edge",
                    "description": "Not worth it.",
                    "stores": [
                        {
                            "id": 1,
                            "name": "Ah Huat's Chicken Rice",
                            "stars": 3.5,
                            "image": {
                                "type": "image/png;base64",
                                "data": "iBORw0KGgoAAaANSuhEUgAAAqAAAA"
                            }
                        }
                    ]
                }
            ]
        }

# Group Stores

## Store [/stores/{id}]

### Retrieve a Store [GET]

+ Request JSON

    + Headers
    
        Authorization: Bearer <jwt>
        Accept: application/json

+ Response 200 (application/json)

    + Body
        
        {
            "name": "Ah Huat's Chicken Rice",
            "stars": 3.5,
            "images": [
                {
                    "type": "image/png;base64",
                    "data": "iBORw0KGgoAAaANSuhEUgAAAqAAAA"
                }
            ],
            "reviews": [
                "name": "James Cameron",
                "review": "This store is awesome!",
                "stars": 4
            ]
        }
