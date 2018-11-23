const siteConfig = {
    title: 'Kakunin',
    tagline: 'E2E testing framework on steroids',
    url: 'https://thesoftwarehouse.github.io/Kakunin/',
    baseUrl: '/Kakunin/',
    projectName: 'Kakunin',
    organizationName: 'TheSoftwareHouse',

    headerLinks: [
        {search: true},
        {href: 'https://github.com/TheSoftwareHouse/Kakunin', label: 'GitHub'},
    ],

    headerIcon: 'img/kakunin_white_logo.svg',
    footerIcon: 'img/kakunin_white_logo_text.svg',
    favicon: 'img/favicon/favicon.ico',

    algolia: {
        apiKey: 'my-api-key',
        indexName: 'my-index-name',
        algoliaOptions: {} // Optional, if provided by Algolia
    },

    colors: {
        primaryColor: '#2F1666',
        secondaryColor: '#7731F6',
    },

    copyright: `Copyright © ${new Date().getFullYear()} The Software House`,

    highlight: {
        theme: 'atom-one-dark',
    },
    scripts: ['https://buttons.github.io/buttons.js'],
    onPageNav: 'separate',
    cleanUrl: true,
};

module.exports = siteConfig;
