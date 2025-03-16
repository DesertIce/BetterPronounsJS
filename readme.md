BetterPronounsJS is my anal retentive addition to generate properly formatted pronouns leveraging Alejo's [Data](https://github.com/Alejo47) library.
I also use [streamerbot's](https://streamerbot.github.io/client/) pronoun data to save redundant work on "simple" pronouns. 
PR's are welcome. I'm not a web dev, so I'm not bothering with better packaging.
Simply pull in the logic via a script tag and use it.

```html
<script type="text/javascript" src="https://desertice.github.io/BetterPronounsJS/pronouns.js"></script>
```
Example:
```javascript
BetterPronounsJS.GetPronouns("desertice").then(p => console.log(`Desertice's pronouns are ${p}`));
```
or
```javascript
const pronouns = await BetterPronounsJS.GetPronouns("desertice");
console.log(`Desertice's pronouns are ${pronouns}`);
```
if you're this far you understand promises.
