module.exports = {
    name: 'GlobalRegulatoryFramework',
    publisher: 'Sample',
    cards: [{
        type: 'GlobalRegulatoryFrameworkCard',
        source: './src/cards/GlobalRegulatoryFrameworkCard',
        title: 'GlobalRegulatoryFramework Card',
        displayCardType: 'GlobalRegulatoryFramework Card',
        description: 'This is an introductory card to the Ellucian Experience SDK',
        pageRoute: {
            route: '/',
            excludeClickSelectors: ['a']
        }
    }],
    page: {
        source: './src/page/router.jsx'
    }
};