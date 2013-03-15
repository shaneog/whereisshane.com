# WhereIsShane

This is a personal project to list where I am currently, and where I've been on my travels.


## Requirements

### Front-End

A responsive single page that displays a map which will show a list of all the places I have "checked-in"

- Use a maps API to plot locations e.g. [Google Maps][1]
- possibly link locations by timeline e.g. [Google Maps Tracks][2]


### Back-end

A single URL/page that I can visit on any browser (desktop/mobile) which will use several techniques to find my currenct location, starting with the most precise and then moving to less precise methods.

The name of the location can be retrieved using [Google Maps Reverse Geocoding service][6].

If more than one result is returned they will all be displayed and a choice can be made on which to use.

Once a choice is made the location data is stored is as JSON.

This URL/back-end must be secured in some way so as to be accessible to only me, even though the site source will be freely available.

Long term location data storage will be via a hosted database provider that provides a free tier:

- [Cloudant][3]
- [MongoHQ][4]
- [MongoLab][5]


#### Storage Schema

``` json
{
    "type":"object",
    "$schema": "http://json-schema.org/draft-03/schema",
    "properties":{
        "name": {
            "description": "The location name, if available",
            "type":"string",
            "id": "name",
            "required":false
        },
        "description": {
            "description": "Optional short description or blurb",
            "type":"string",
            "id": "description",
            "required":false
        },
        "location": {
            "description": "The location co-ordinates",
            "type":"object",
            "id": "location",
            "required":true,
            "properties":{
                "lat": {
                    "type":"number",
                    "id": "lat",
                    "required":true
                },
                "lng": {
                    "type":"number",
                    "id": "lng",
                    "required":true
                }
            }
        },
        "timestamp": {
            "description": "Check-in time",
            "type":"number",
            "id": "timestamp",
            "required":true
        }
    }
}
```

##### Full Example:
``` json
{
  "name": "East Pier, Dun Laoghaire-Rathdown, Dublin, Ireland",
  "description": "Dun Laoghaire Harbour",
  "location":{
    "lat": 53.29272,
    "lng": -6.12973,
  },
  "timestamp": 1363352656691
}
```


 [0]: http://WhereIsShane.com
 [1]: https://developers.google.com/maps/
 [2]: https://developers.google.com/maps/documentation/tracks/
 [3]: https://cloudant.com
 [4]: https://www.mongohq.com
 [5]: https://mongolab.com/
 [6]: https://developers.google.com/maps/documentation/geocoding/#ReverseGeocoding
