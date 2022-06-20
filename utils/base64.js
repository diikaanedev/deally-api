
exports.base64 = base => {

    if (base === undefined) {
        return false;
    } else {
        // to declare some path to store your converted image
        const matches = base.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};



        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }

        response.type = matches[1];

        response.data = Buffer(matches[2], 'base64');

        let decodedImg = response;



        let imageBuffer = decodedImg.data;

        let type = decodedImg.type;

        let extension = mime.getExtension(type);

        let fileName = randomStrig.generate({
            length: 12,
            charset: 'alphabetic'
        });



        const pa = path.join(path.dirname(process.mainModule.filename), 'files/') + fileName + '.jpg';

        sharp(
            imageBuffer,
        ).resize(300, 300).
            toFormat('webp')
            .toFile(`files/${fileName}-300.webp`, (err, info) => {

                if (err) {
                    console.log("err => ", err);
                }

                // console.log("info =>" , info);

            });

        sharp(
            imageBuffer,
        ).resize(180, 180).
            toFormat('webp')
            .toFile(`files/${fileName}-180.webp`, (err, info) => {

                if (err) {
                    console.log("err => ", err);
                }

                // console.log("info =>" , info);

            });

        sharp(
            imageBuffer,
        ).resize(100, 100).
            toFormat('webp')
            .toFile(`files/${fileName}-100.webp`, (err, info) => {

                if (err) {
                    console.log("err => ", err);
                }

                // console.log("info =>" , info);

            });

        fs.writeFileSync(pa, imageBuffer, 'utf8');



        return `/storage/${fileName}`;

    }

}
