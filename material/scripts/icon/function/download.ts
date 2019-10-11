const http = require('http');
const fs = require('fs');

export const download = async  (url: string, dest: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        try{
        if(fs.existsSync(dest)){
            resolve();
        }
        const file = fs.createWriteStream(dest);
        http.get(url, function (response: any) {

            if (response.statusCode !== 200) {
                return reject('Response status was ' + response.statusCode);
            }
            response.pipe(file);
            file.on('finish', function () {
                resolve();
            });
        });
        } catch(e){
            reject(e);
        }
    });
};


