const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch(env){
        case 'dev':
        return {
            bd_string: "mongodb://localhost:27017/user"
        }

        case 'hml':
        return {
            bd_string: "mongodb://localhost:27017/user"
        }

        case 'prod':
        return {
            bd_string: "mongodb://localhost:27017/user"
        }
    }    
}
console.log(`Iniciando a api em ambientes ${env.toUpperCase()}`);

module.exports = config();