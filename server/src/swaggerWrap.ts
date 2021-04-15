import * as swaggerDocument from './swagger.json';

const wrappedDocument = {
    ...swaggerDocument,
    servers: [
        {
            url: 'https://damp-river-86373.herokuapp.com/',
            description: 'Staging'
        },
        {
            url: `http://localhost:${process.env.PORT || 3001}`,
            description: 'Local dev'
        }
    ]
};

export default wrappedDocument;
