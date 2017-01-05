# familytree

### Description ###

This simple program allows you to visualize your family tree in a fancy way.

### Features ###

 * Portable application
 * Facebook profiles and avatars support
 * WhatsApp support
 * Support to subtrees visualization

### Configuration ###

The program is configured to display the family tree stored in the `data.json` file.

The content of such file is a structured JSON object, including the following properties.
 * `title`: the family name
 * `lastupdate`: a last update information to be used to log updates on the file
 * `parent`: including the tree information

#### The Person object ###

The `parent` property is composed of a `Person` object, structured in the following way.

```
{
		"id": "mariorossi",
		"name": "Mario",
		"surname": "Rossi",
		"sex": "male",
		"birthdate": "21/02/2000",
		"deathdate": "",
		"photo": "",
		"contacts": {
			"phone": "+39 06 1234567",
			"whatsapp": "+39 06 1234567",
			"facebook": "mario.rossi",
			"facebookid": "1234567",
			"twitter": "mario.rossi",
			"email": "mario.rossi@example.com"
		},
		"location": {
			"city": "Rome",
			"country": "Italy",
			"lat": "41.89917866481739",
			"lon": "12.488923072814941"
		},
		"sons": [
		]
}
```

Following properties are part of the `Person` object.
 * `id`: a unique identifier used to provide the ability to open a specific page showing the relative sub-tree when the person name is clicked
 * `name` (required): name of the person
 * `surname` (required): surname of the person
 * `sex`: sex of the person (`male`, `female` or anything else)
 * `birthdate`: date of birth of the person
 * `deathdate`: date of death of the person
 * `photo` (currently not supported): a link to a picture of the person
 * `contacts`: including contact information:
  - `phone`: phone number
  - `whatsapp`: WhatsApp number
  - `facebook`: Facebook name
  - `facebookid`: Facebook identifier (in order to obtain it, see https://www.graphsearcher.com)
  - `twitter`: Twitter username
  - `email`: email address
 * `location`: including location information:
  - `city`: city name
  - `country`: country name
  - `lat`: location latitude (in order to obtain it, see http://getlatlon.yohman.com)
  - `lon`: location longitude (in order to obtain it, see http://getlatlon.yohman.com)
 * `sons`, a list of sons/subnodes, defined as `Person` objects

You can see an example on the [data.json](data.json) file.

### Credits ###

This script is based on http://thecodeplayer.com/walkthrough/css3-family-tree.

### Contacts ###

You can find me on Twitter as [@auino](https://twitter.com/auino).
