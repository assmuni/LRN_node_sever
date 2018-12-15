// ### THIS IS SERVER MOTHER FATHER


// var http = require('http');

// // # param_1 = request server (request + request headers)
// // # param_2 = response server (response data + response headers)
// var server = http.createServer(function(req, res){

//     console.log('request was made ' + req.url);

//     // # param_1 = status (200 / 404 dll)
//     // # param_2 = content-type (html / plain text / json)
//     res.writeHead(200, {'Content-type': 'text/plain'});
//     res.end('Send back data');
// });

// server.listen(3000, '127.0.0.1');
// console.log('you dawgs, server on 127.0.0.1:3000');


// # BUFFER : temporary storage yang di gunakan untuk mengnumpulkan data kecil

// # STREAM : aliran data yang mengalir dari satu tempat ke tempat lainnya Data -> buffer -> data_processed -> viewing client


// ### READABLE STREAMS membaca file data

// var http = require('http');
// var fs = require('fs');

// // var myReadStream = fs.createReadStream(__dirname + '/readMe.txt');
// var myReadStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf8');

// // # event listener
// // setiap ada data yng di pecah menjadi chuck maka event listener di bawah akan melihat jika event nya data maka
// // function di bawah ini akan berjalan 
// myReadStream.on('data', function(chunk){
//     console.log('---- new chunk received ----');
//     console.log(chunk);
// });


// ### WRITABLE STREAMS membaca data dan mengirimkannya

// var http = require('http');
// var fs = require('fs');

// // #1 membaca data fs akan membaca data dan memecahnya menjadi bagian kecil/chunk
// var myReadStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf8');
// // #4 menulis data yang di terima dari #3
// var myWriteStream = fs.createWriteStream(__dirname + '/writeMe.txt');

// // #2 event listener untuk memantau chunck yg di terima
// myReadStream.on('data', function(chunk){
//     console.log('---- new chunk received ----');

//     // #3 write data to new file
//     myWriteStream.write(chunk);
// });

// ### CAUNTION
// sama seperti fs.writeFile yg sebelumnya cuman di fs.createReadStream dia menggunakan stream dan buffer
// jadi data yang di transver di bagi menjadi bagian kecil(CHUNCK) jadi prosesnya bisa lebih cepet 
// tanpa menuggu semua data yg di transver memenuhi memori



// ### PIPEING

// # PIPE : di gunakan untuk mengahrahkan kemana isi file yg telah di read untuk di write di suatu tempat

// var fs = require('fs');

// var myReadStream = fs.createReadStream(__dirname + '/readMe.txt', 'utf8');
// var myWriteStream = fs.createWriteStream(__dirname + '/writeMe.txt');

// // pipeing from readable stream to write stream
// myReadStream.pipe(myWriteStream);



// ### USING PIPE
// menggunakan pipe untuk mengirimkan data yg di dapat dari reading proses pada suatu file menuju client/browser
// menguunakan server yg telah di buat dan contoh pipe yg telah di buat pula

// var http = require('http');
// var fs = require('fs');

// var server = http.createServer(function(req, res) {
//     // console.log('request di buat pada endpoint : '+ req.url);

//     res.writeHead(200, {'Content-Type': 'plain/text'});

//     // # membaca dan mengarahkan data pada respon server dengan menggunakan pipe()
//     var readData = fs.createReadStream(__dirname + '/readMe.txt', 'utf8');
//     readData.pipe(res);

//     // # untuk mengetahui pembagian data pada file
//     readData.on('data', function(chunck) {
//         console.log('[PEMBAGIAN DATA MENJADI CHUNCK]')
//         console.log(chunck);
//     });

//     // res.write('server cuy');
//     // res.end();
// });

// server.listen(3000, '127.0.0.1');
// console.log('-- Server jalan di localhost:3000 --');




// ### SERVING HTML PAGES

// var http = require('http');
// var fs = require('fs');

// var server = http.createServer(function(req, res) {
    
//     // # change type oh Content-type from text/plain to text/html
//     res.writeHead(200, {'Content-Type': 'text/html'});

//     var dataSource = fs.createReadStream(__dirname + '/index.html', 'utf8');
//     dataSource.pipe(res);
// }); 

// var host = '127.0.0.1';
// var port = 3000;
// server.listen(port, host, function() {
//     console.log('Sodara-sodara sever telah berjalan di '+ host +':'+port);
// });



// # SERVING JSON DATA (OMG this think looks like a small api)

// var http = require('http');
// var fs = require('fs');

// var server = http.createServer(function(req, res) {
    
//     // # change type oh Content-type from text/plain OR text/html to application/json
//     res.writeHead(200, {'Content-Type': 'application/json'});

//     // # DARI OBJECT
//     var myObj = {
//         name: 'Azmi F. Fauzi',
//         age: 26,
//         address: 'Bali, Indonesia',
//         experience: [{
//             company: 'Jogjasite',
//             year: 2015
//         }, {
//             company: 'welife global',
//             year: 2018
//         }]
//     }

//     // # param ini harus berupa string atau data buffer jadi harus di convert
//     res.end(JSON.stringify(myObj));

//     // # DARI FILE JSON
//     // var data = fs.createReadStream(__dirname+'/data.json');
//     // data.pipe(res);
// }); 

// var host = '127.0.0.1';
// var port = 3000;
// server.listen(port, host, function() {
//     console.log('Sodara-sodara sever telah berjalan di '+ host +':'+port);
// });


// ### BASIC ROUTING

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
    console.log(`Client request : ${req.url}`);

    if (req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname+'/index.html').pipe(res);
    } else if (req.url === '/api/data') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        fs.createReadStream(__dirname+'/data.json').pipe(res);
    } else if(req.url === "/text") {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        fs.createReadStream(__dirname+'/readMe.txt').pipe(res);
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        var notFound = {
            status: 404,
            message: 'page not found, wrong end point'
        }
        res.end(JSON.stringify(notFound));
    }
});

var host = '127.0.0.1';
var port = 3000;
server.listen(port, host, function(){
    console.log(`Server telah online sodara - sodara di ${host}:${port}`);
});












