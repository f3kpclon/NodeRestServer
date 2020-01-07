process.env.PORT = process.env.PORT || 3000;

/**ENTORNO */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**BASE DE DATOS */
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/my_cafe';
}else{
    urlDB = 'mongodb+srv://bjorskull:F3kpCLON002-@cluster0-co4tj.mongodb.net/my_cafe'
}

process.env.URLDB = urlDB;