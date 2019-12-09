export default {
    mode: 'spa',
    //mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', type:'text/css', href: '//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css'},
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [
        '~/css/styles.css'
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        {src: '~/plugins/hotkey.js'},
        {src: '~/plugins/storage.js', ssr: false},
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [],
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    },
    generate: {
        dir: 'public'
    }
};
