module.exports = {
    apiLoginKey: process.env.APILOGINID,
    transactionKey: process.env.TRANSACTIONKEY,
    config: {
        logger: {
            enabled: false,
            location: '',
            level: 'silly',
        },
    },
};
