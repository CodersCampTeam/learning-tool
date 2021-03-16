import * as swaggerDocument from './swagger.json';

const wrappedDocument = {
    ...swaggerDocument,
    servers: [
        {
            url: `http://localhost:${process.env.PORT || 3000}`,
            description: 'Local dev'
        },
        {
            url: 'https://damp-river-86373.herokuapp.com/',
            description: 'Staging'
        }
    ]
};

export default wrappedDocument;
