# kitsu.js
A wrapper for the Kitsu API that is made to simplify things as well as provide consitent data.

### Installation
If using yarn,
```sh
$ yarn add kitsu --save
```
If using npm,
```sh
$ npm install kitsu --save
```
### Examples
Retrieve an array of Anime objects using the passed search term:
```js
const kitsu = new (require('kitsu'));

(async () => {
    let response;

    try {
        let response = await kitsu.searchAnime('RWBY');
    } catch(e) {
        // Handle error with request

        console.log('Error getting anime data', e);
        return;
    }
    // Do something with the response

    console.log(response);
})();

### License
This project is [licensed under ISC][license].

[license]: https://github.com/hsiW/kitsu/blob/master/LICENSE
