//pipeline -> trabalha com callbacks
import {pipeline,Readable, Writable, Transform} from 'stream';
//converter para promise
import { promisify } from 'util';
//salvar os dados num arquivo -> writableStream
import { createWriteStream } from 'fs';

const pipelineAsync = promisify(pipeline);

{
    const readableStream = Readable({
        read: function() {
            this.push("Hello Alanzinho 0");
            this.push("Hello Alanzinho 1");
            this.push("Hello Alanzinho 2");
            this.push(null);
        }
    })

    //callbacks são para usar em streams
    const writableStream = Writable({
        write (chunck, encoding, callback) {
            //chunck -> buffer
            console.log('msg', chunck.toString());
            callback();
        }
    })
    await pipelineAsync(
        readableStream,
        // process.stdout
        writableStream
    )
    console.log('finished 01 process')
}
{
    const readableStream = Readable({
        read() {
            for(let index = 0; index < 1e5; index++) {
                const person = {id: Date.now() + index, name: `Alan-${index}`}
                const data = JSON.stringify(person);
                this.push(data);
            }
            //avisa que acabou o processamento
            this.push(null);
        }
    })

    const writableMapToCSV = Transform({
        transform(chunck, encoding, callback) {
           const data = JSON.parse(chunck);
           const result = `${data.id},${data.name.toUpperCase()}\n`;
           callback(null, result); //primeiro parâmetro, por padrão, é erro, no segundo é sucesso
        }
    });

    const setHeader = Transform({
        transform(chunck, encoding, callback) {
            this.counter = this.counter ?? 0;
            if(this.counter) {
                return callback(null, chunck);
            }

            this.counter += 1;
            const result = "id,name\n".concat(chunck);
            callback(null, result)
        }
    })

    const writableStream = Writable({
        write(chunck, encoding, callback) {
            console.log(chunck.toString());
            callback();
        }
    })

    await pipelineAsync(
        readableStream,
        writableMapToCSV,
        setHeader,
        // writableStream
        createWriteStream('my.csv')
    );
}
