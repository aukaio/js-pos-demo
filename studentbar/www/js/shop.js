define(['underscore', 'backbone', 'merchant', 'text!/templates/product.html', 'text!/templates/shop.html', 'backboneLS', 'bootstrap'],
function (_, Backbone, merchant, productTemplate, shopTemplate) {

    var shortlinkId = 'xyQ7H';

    var Shop = {};

    Shop.Product = Backbone.Model.extend({
        defaults: {
            price: 0
        }
    });

    Shop.Products = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("Products"),
        model: Shop.Product
    });

    Shop.ProductEntryView = Backbone.View.extend({

        tagName: 'li',
        template: _.template(productTemplate),

        render: function (options) {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.attr('id', this.model.id);
            return this;
        }
    });

    Shop.ShopView = Backbone.View.extend({

        template: _.template(shopTemplate),

        initialize: function (options) {
            this.sum = 0;
        },

        events: {
            'click li': 'addItem',
            'click #clear': 'clear',
            'click #sell': 'sell'
        },

        addItem: function (ev) {
            var product = this.collection.get(ev.currentTarget.id);
            var quantity = parseInt($(ev.currentTarget).find('.quantity').text());
            $(ev.currentTarget).find('.quantity').text(quantity+1);
            this.sum += product.get('price');
            this.$('.totalAmount').text(this.sum);
        },

        clear: function (ev) {
            this.sum = 0;
            this.$('.quantity').text('0');
            this.$('.totalAmount').text(this.sum);
        },

        sell: function (ev) {
            var self = this;
            var posTid = Math.random().toString(36).substring(5);
            var p = merchant.sale(this.sum, posTid, shortlinkId, 20)
                .progress(function (progress) {
                    console.log(progress);
                })
                .done(function () {
                    self.$('#sellModal').modal('hide');
                    self.clear();
                })
                .fail(function () {
                    self.$('#sellModal').modal('hide');
                });
            this.$('#sellModal').modal().on('hidden.bs.modal', function () {

            });
        },

        render: function (options) {
            var v;
            this.$el.html(this.template({total: 0}));
            _.each(this.collection.models, function(product) {
                v = new Shop.ProductEntryView({model: product});
                this.$('#products').append(v.render().$el);
            }, this);
            return this;
        },

    });

    return Shop;

});