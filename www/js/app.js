define(['jquery', 'underscore', 'backbone', 'shop'],
function ($, _, Backbone, Shop) {
    var app = _.extend({

        start: function () {
            this.router = new Router();
            this.initializeRouter();
        },

        initializeRouter: function () {
            // Trigger the initial route and enable HTML5 History API support
            Backbone.history.start({ pushState: true, root: '/'});

            console.log('initializeRouter')

            // All navigation that is relative should be passed through the navigate
            // method, to be processed by the router. If the link has a `data-bypass`
            // attribute, bypass the delegation completely.
            //
            // @link https://github.com/tbranyen/backbone-boilerplate/blob/master/app/main.js
            $(document).on('click', 'a[href]:not([data-bypass])', function(event) {
                var href = $(this).prop('href'),
                    root = location.protocol + '//' + location.host + module.config().rootUrl + '/';

                if (href.slice(0, root.length) === root) {
                    event.preventDefault();

                    Backbone.history.navigate(href.slice(root.length), true);
                }
            });
        }

    });

    var Router = Backbone.Router.extend({

        routes: {
            '': 'shop',
            'index.html': 'shop',
            'setup': 'shop',
            'shop': 'shop',
            'edit': 'edit'
        },

        shop: function () {
            var products = new Shop.Products();
            products.fetch();
            var shop = new Shop.ShopView({collection: products});
            $('#main').html(shop.render().$el);
        },

        edit: function () {
            var products = new Shop.Products();
            products.fetch();
            var productEditView = new Shop.ProductListView({collection: products});
            $('#main').html(productEditView.render().$el);
            $('input[name="title"]').focus();
        }
    });

    return app;
});