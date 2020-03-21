import CountryStore from '../store/Countries.mjs';
import Gallery      from '../../../node_modules/neo.mjs/src/component/Gallery.mjs';

/**
 * @class Covid19.view.CountryGallery
 * @extends Neo.component.Gallery
 */
class CountryGallery extends Gallery {
    static getStaticConfig() {return {
        /**
         * A regex to replace blank chars
         * @member {RegExp} flagRegEx=/ /gi
         * @private
         * @static
         */
        flagRegEx: / /gi
    }}

    static getConfig() {return {
        /**
         * @member {String} className='Covid19.view.CountryGallery'
         * @private
         */
        className: 'Covid19.view.CountryGallery',
        /**
         * @member {String[]} cls=['neo-country-gallery', 'neo-gallery', 'page', 'view']
         */
        cls: ['neo-country-gallery', 'neo-gallery', 'page', 'view'],
        /**
         * The image height of the gallery
         * @member {Number} imageHeight=240
         */
        imageHeight: 280,
        /**
         * The image width of the gallery
         * @member {Number} imageWidth=320
         */
        imageWidth: 340,
        /**
         * @member {Object} itemTpl_
         */
        itemTpl: {
            cls     : ['neo-gallery-item', 'image-wrap', 'view', 'neo-transition-1000'],
            tabIndex: '-1',
            cn: [{
                cls  : ['neo-item-wrapper'],
                style: {},
                cn: [{
                    tag  : 'div',
                    cls  : ['neo-country-gallery-item'],
                    style: {},

                    cn: [{
                        cls: ['neo-item-header'],
                        cn: [{
                            tag: 'img',
                            cls: ['neo-flag']
                        }, {

                        }]
                    }, {
                        tag: 'table',
                        cls: ['neo-content-table'],
                        cn : [{
                            tag: 'tr',
                            cn : [
                                {tag: 'td', html: 'Cases'},
                                {tag: 'td', cls: ['neo-align-right']},
                                {tag: 'td', style: {width: '100%'}},
                                {tag: 'td', html: 'Cases today'},
                                {tag: 'td', cls: ['neo-align-right']}
                            ]
                        }, {
                            tag: 'tr',
                            cn : [
                                {tag: 'td', html: 'Deaths'},
                                {tag: 'td', cls: ['neo-align-right', 'neo-content-deaths']},
                                {tag: 'td', style: {width: '100%'}},
                                {tag: 'td', html: 'Deaths today'},
                                {tag: 'td', cls: ['neo-align-right', 'neo-content-deaths']}
                            ]
                        }, {
                            tag: 'tr',
                            cn : [
                                {tag: 'td', html: 'Recovered'},
                                {tag: 'td', cls: ['neo-align-right', 'neo-content-recovered']},
                                {tag: 'td', style: {width: '100%'}},
                                {tag: 'td', html: 'Critical'},
                                {tag: 'td', cls: ['neo-align-right', 'neo-content-critical']}
                            ]
                        }]
                    }]
                }]
            }]
        },
        /**
         * The unique record field containing the id.
         * @member {String} keyProperty='id'
         */
        keyProperty: 'country',
        /**
         * True to select the item inside the middle of the store items on mount
         * @member {Boolean} selectOnMount=false
         */
        selectOnMount: false,
        /**
         * @member {Neo.data.Store} store=CountryStore
         */
        store: CountryStore
    }}

    /**
     * Override this method to get different item-markups
     * @param {Object} vdomItem
     * @param {Object} record
     * @param {Number} index
     * @returns {Object} vdomItem
     */
    createItem(vdomItem, record, index) {
        let me         = this,
            firstChild = vdomItem.cn[0].cn[0],
            table      = firstChild.cn[1];

        vdomItem.id = me.getItemVnodeId(record[me.keyProperty]);

        vdomItem.cn[0].style.height = me.imageHeight + 'px';

        firstChild.style.height = (me.imageHeight - 70) + 'px';
        firstChild.style.width  = me.imageWidth  + 'px';

        firstChild.cn[0].cn[0].src  = me.getCountryFlagUrl(record.country);
        firstChild.cn[0].cn[1].html = record.country;

        table.cn[0].cn[1].html = record.cases;
        table.cn[1].cn[1].html = record.deaths;
        table.cn[2].cn[1].html = record.recovered;

        table.cn[0].cn[4].html = record.todayCases;
        table.cn[1].cn[4].html = record.todayDeaths;
        table.cn[2].cn[4].html = record.critical;

        return vdomItem;
    }

    /**
     *
     * @param {String} name
     * @return {String} url
     */
    getCountryFlagUrl(name) {
        const map = {
            'cabo-verde'            : 'cape-verde',
            'car'                   : 'central-african-republic',
            'channel-islands'       : 'jersey',
            'congo'                 : 'democratic-republic-of-congo',
            'curaçao'               : 'curacao',
            'czechia'               : 'czech-republic',
            'diamond-princess'      : 'japan', // cruise ship?
            'drc'                   : 'democratic-republic-of-congo',
            'el-salvador'           : 'salvador',
            'eswatini'              : 'swaziland',
            'faeroe-islands'        : 'faroe-islands',
            'french-guiana'         : 'france', // ?
            'guadeloupe'            : 'france', // ?
            'mayotte'               : 'france', // ?
            'new-caledonia'         : 'france',
            'north-macedonia'       : 'republic-of-macedonia',
            'poland'                : 'republic-of-poland',
            'réunion'               : 'france',
            'saint-lucia'           : 'st-lucia',
            's.-korea'              : 'south-korea',
            'st.-barth'             : 'st-barts',
            'saint-martin'          : 'sint-maarten',
            'st.-vincent-grenadines': 'st-vincent-and-the-grenadines',
            'timor-leste'           : 'east-timor',
            'u.s.-virgin-islands'   : 'virgin-islands',
            'uae'                   : 'united-arab-emirates',
            'uk'                    : 'united-kingdom',
            'usa'                   : 'united-states-of-america',
            'uzbekistan'            : 'uzbekistn'
        };

        let imageName = name.toLowerCase().replace(CountryGallery.flagRegEx, '-');

        imageName = map[imageName] || imageName;

        return 'https://raw.githubusercontent.com/neomjs/pages/master/resources/images/flaticon/country_flags/png/' + imageName + '.png'
    }

    /**
     *
     * @param {String} vnodeId
     * @returns {String} itemId
     */
    getItemId(vnodeId) {
        return vnodeId.split('__')[1];
    }

    /**
     *
     * @param {Array} items
     */
    onStoreLoad(items) {
        super.onStoreLoad(items);

        setTimeout(() => {
            this.selectOnMount = true;
            this.onMounted();
        }, Neo.config.environment === 'development' ? 200 : 500);
    }
}

Neo.applyClassConfig(CountryGallery);

export {CountryGallery as default};