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

            // All navigation that is relative should be passed through the navigate
            // method, to be processed by the router.  If the link has a data-bypass
            // attribute, bypass the delegation completely.
            $(document).on('click', 'a:not([data-bypass])', function (evt) {
                // Get the absolute anchor href.
                var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
                // Get the absolute root.
                var root = location.protocol + "//" + location.host + '/';
                // Ensure the root is part of the anchor href, meaning it's relative.
                if (href.prop && href.prop.slice(0, root.length) === root) {
                    // Stop the default event to ensure the link will not cause a page
                    // refresh.
                    evt.preventDefault();
                    // `Backbone.history.navigate` is sufficient for all Routers and will
                    // trigger the correct events. The Router's internal `navigate` method
                    // calls this anyways.  The fragment is sliced from the root.
                    Backbone.history.navigate(href.attr, true);
                }
            });
        },

    });

    var Router = Backbone.Router.extend({

        routes: {
            '': 'edit',
            'edit': 'edit'
        },

        home: function () {
            var products = new Shop.Products();
            products.fetch();
            if (products.size() === 0) {
                products.create({title: 'Vanity Cola', price: 1000});
                products.create({title: 'Beer', price: 10});
            }

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