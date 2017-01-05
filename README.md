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
			"facebookid": "",
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
 * `id` (optional)
 * `name`
 * `surname`
 * `sex`
 * `birthdate`
 * `deathdate` (optional)
 * `photo` (optional, currently not supported)
 * `contacts`
  - `phone`
  - `whatsapp`
  - `facebook`
  - `facebookid`
  - `twitter`
  - `email`
 * `location`
  - `city`
  - `country`
  - `lat`
  - `lon`
 * `sons`

### Credits ###

This script is based on http://thecodeplayer.com/walkthrough/css3-family-tree.

### Contacts ###

You can find me on Twitter as [@auino](https://twitter.com/auino).
