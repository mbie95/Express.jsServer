var express = require('express'); //import biblioteki express, framework do http

var app = express(); //inicjalizacja aplikacji express

//middleware odpowiada za filtrowanie danych, sprawdzanie np. czy uzytkownik zalogowany
//uruchamiane przed glowna akcja, moze byc jako firewall
var middleware = function (req, res, next) {
    console.log('new request!'); //wypisanie w konsoli informacji o nowym zapytaniu
    next(); //przekierowanie do dalszej warstwy, bez tego nasze zapytanie utknie
}

//dolaczenie middleware do aplikacji
app.use(middleware);

//sciezka naszej aplikacji (pierwszy argument)
//funkcja callback zawiera zapytanie i odpowiedz serwera
/*
app.get('/', (req, res) => res.send('Hello world')); //obsluga metody get
*/
app.all('/', (req, res) => res.send('Hello world')); //dla kazdej metody

app.get('/api/getRandomNumber', (req, res) => {
    res.send({randomNumber: Math.random()});
});

//zapytanie dla metody get z parametrami
//po ':' dwukropku jest parametr
app.get('/api/random/min/:min/max/:max', (req, res) => {
    var min = Number(req.params.min);
    var max = Number(req.params.max);

    var randomNumber = Math.floor((Math.random() * (max - min)) + min);
    res.send({randomNumber: randomNumber});
});

//ustawiamy na jakim porcie bedzie nasz serwer
app.listen(3000, () => console.log("Serwer dziala na porcie 3000"));