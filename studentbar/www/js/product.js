define(['underscore', 'backbone', 'text!/templates/product.html', 'backboneLS'],
function (_, Backbone, productTemplate) {


    var Product = {};

    Product.Product = Backbone.Model.extend({
        defaults: {
            price: 0
        }
    });

    Product.Products = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("Products"),
        model: Product.Product
    });

    Product.ProductView = Backbone.View.extend({

        template: _.template(productTemplate),

        render: function (options) {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });



    Product.ProductEditView = Backbone.View.extend({

        render: function (options) {
            return this;
        }
    });

    Product.ProductsView = Backbone.View.extend({

        render: function (options) {
            var v;
            this.$el.empty();
            _.each(this.collection.models, function(product) {
                v = new Product.ProductView({model: product});
                this.$el.append(v.render().$el);
            }, this);
            return this;
        },


    });

    return Product;

});