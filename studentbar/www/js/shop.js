define(['underscore', 'backbone', 'merchant',
        'text!/templates/product.html',
        'text!/templates/shop.html',
        'text!/templates/alert.html',
        'text!/templates/product_list.html',
        'text!/templates/product_edit.html',
        'backboneLS', 'bootstrap'],
function (_, Backbone, merchant, productTemplate, shopTemplate, alertTemplate, productListTemplate, productEditTemplate) {

    var shortlinkId = 'xyQ7H';
    var Shop = {};

    var alertTemplate = _.template(alertTemplate);
    var productEditTemplate = _.template(productEditTemplate);

    Shop.ProductListView = Backbone.View.extend({

        template: _.template(productListTemplate),
        events: {
            'submit form': 'createProduct',
            'click button': 'deleteProduct'
        },

        initialize: function(options) {
            this.collection.on('change', this.render, this);
            this.collection.on('remove', this.render, this);
        },

        createProduct: function (ev) {
            ev.preventDefault();
            var values = this.$('form').serializeArray();
            values = {title: values[0].value, price: parseFloat(values[1].value).toFixed(2)};
            this.collection.create(values);
            this.$('input[name="title"]').focus();
        },

        deleteProduct: function (ev){
            ev.preventDefault();
            this.collection.get(ev.currentTarget.id).destroy();
            //this.collection.remove(ev.currentTarget.id);
            //this.collection.reset(this.collection.models);
            //this.collection.save();
        },

        render: function() {
            var self = this;
            var products = this.collection.models;
            this.$el.html(this.template());
            this.collection.each(function (product){
                self.$('#products').prepend(
                    productEditTemplate(product.toJSON())
                );
            })

            return this;
        }
    });

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
            this.sum += parseFloat(product.get('price'));
            this.$('.totalAmount').text(this.sum.toFixed(2));
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
                    self.$('.modal-body').text(progress);
                })
                .done(function () {
                    self.$('#sellModal').modal('hide');
                    self.$el.prepend(alertTemplate({message: 'Payment successful', type: 'success'}));
                    self.clear();
                })
                .fail(function () {
                    self.$('#sellModal').modal('hide');
                    self.$el.prepend(alertTemplate({message: 'Payment failed', type: 'danger'}));

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