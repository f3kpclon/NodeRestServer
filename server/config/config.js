process.env.PORT = process.env.PORT || 3000;
/**vencimiento de token */
process.env.EXP_TOKEN = 60 * 60 * 24;

/**seed token */
process.env.SEED = process.env.SEED || 'seed-desa';
/**ENTORNO */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**BASE DE DATOS */
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/my_cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;