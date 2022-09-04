
/**
 * PRIMEIRA FORMA COM stdin e stdout
 */

// const stdin = process.stdin.on('data', msg => console.log(msg.toString()));

// const stdount = process.stdout.on('data', msg => console.log(mgs.toString()));

// stdin.pipe(stdount);


/**
 * SEGUNDA FORMA COM CREATEREADSTREAM -> dividindo em mais chuncks
 */
//node -e => evaluates, avalia o arquivo
//node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file

// import http from 'http';
// import {createReadStream, readFileSync} from 'fs';

// http.createServer((req, res) => {
    // const file = readFileSync('big.file'); //.toString();
    // res.write(file);
    // res.end();

    // manipulando o dado
    // createReadStream("big.file")
    // .pipe(res);

// }).listen(3000, () => console.log('running'))


/**
 * TERCEIRA FORMA COM SOCKET
 */
import net from 'net';
//web socket nativo do js
//socket -> duplex stream -> tanto um readableStream quanto um writableStream
net.createServer(socket => socket.pipe(process.stdout)).listen(1338, () => console.log('running 1338'));
//ligar o terminal com o socket, tudo que for digitado no socket, será enviado para o servidor, este, vai imprimir num terminal externo
//node -e "process.stdin.pipe(require('net').connect(1338))"
