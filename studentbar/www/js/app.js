define(['jquery', 'underscore', 'backbone', 'product'],
function ($, _, Backbone, Product) {

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
            '': 'home',
            'edit': 'edit'
        },

        home: function () {
            var products = new Product.Products();
            products.fetch();
            if (products.models.length === 0) {
                products.create({title: 'Beer', price: 10});
                products.create({title: 'Vanity Cola', price: 1000});
            }
            var v = new Product.ProductsView({collection: products});
            $('#main').html(v.render().$el);
        },

        edit: function () {
        }
    });

    return app;
});