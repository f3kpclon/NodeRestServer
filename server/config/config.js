process.env.PORT = process.env.PORT || 3000;
/**vencimiento de token */
process.env.EXP_TOKEN = '24h'; /*60 * 60 * 24*/;

/**seed token */
process.env.SEED = process.env.SEED || 'seed-desa';
/**ENTORNO */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
/***CLIENT ID GOOGLE*/
process.env.CLIENT_ID = process.env.CLIENT_ID || '776000195431-c77bdnkovcohnrgjf362terjefeop5d8.apps.googleusercontent.com';
/**BASE DE DATOS */
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/my_cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;