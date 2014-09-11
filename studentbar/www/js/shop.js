define(['underscore', 'backbone', 'product', 'sale', 'text!/templates/shop.html', 'backboneLS'],
function (_, Backbone, Product, Sale, shopTemplate) {

    var Shop = {};

    Shop.ShopView = Backbone.View.extend({

        template: _.template(shopTemplate),

        initialize: function (options) {
            var sale = new Sale.Sale();
            sale.fetch();
            var products = new Product.Products();
            products.fetch();

            this.saleView = new Sale.SaleView({collection: sale});
            this.productsView = new Product.ProductsView({collection: products});
        },

        render: function (options) {
            this.$el.html(this.template({

                products: this.productsView.render(options).$el.html(),
                sale: this.saleView.render(options).$el
            }));
            console.log(this.productsView.render(options).$el);
            return this;
        },

        events: {
			'click #product': 'addProduct'
		},

        addProduct: function (e){
            e.preventDefault();
            var id = $(e.currentTarget).data('id');
            var product = this.productsView.collection.get(id);
            this.saleView.collection.create({title: product.get('title'), price: product.get('price'), quantity: 1});
            this.saleView.render();
            console.log(product);
        }

    });

    return Shop;

});