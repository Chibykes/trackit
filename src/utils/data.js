const trx = [

    {
        id: '111',
        type: 'debit',
        category: 'Generator',
        amount: 1800,
        description: 'Bought Engine Oil',
        date: '2021-11-29T13:52:53.505Z'
    },
    {
        id: '122',
        type: 'credit',
        category: 'Printing',
        amount: 500,
        description: 'Printed a 2 paged job black',
        date: '2021-11-29T05:52:53.505Z'
    },
    {
        id: '123',
        type: 'credit',
        category: 'Research Works',
        amount: 50000,
        description: 'Student paid in full for project',
        date: '2021-11-29T05:52:53.505Z'
    },
    {
        id: '124',
        type: 'debit',
        category: 'Printer',
        amount: 2200,
        description: 'Bought A4 paper 70gms',
        date: '2021-11-29T05:52:53.505Z'
    }, {
        id: '125',
        type: 'debit',
        category: 'Printer',
        amount: 2400,
        description: 'Bought 2 Monochrome Toner',
        date: '2021-11-29T05:52:53.505Z'
    },


]

const payments_category = [
    'Graphics Design',
    'Hardware Sales',
    'ID Card Printing',
    'PC Repairs',
    'Printing',
    'Research Works',
    'Software Development',
    'Training',
    'Typing'
];

const spendings_category = [
    'Printer',
    'Generator',
    'Hardware',
    'Software',
    'Building',
    'Food'
];


export {
    trx,
    payments_category,
    spendings_category
};
