define(['underscore', 'backbone', 'text!/templates/saleentry.html', 'backboneLS'],
function (_, Backbone, saleEntryTemplate) {


    var Sale = {};

    Sale.SaleEntry = Backbone.Model.extend({});

    Sale.Sale = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("Sale"),
        model: Sale.SaleEntry
    });

    Sale.SaleEntryView = Backbone.View.extend({

        template: _.template(saleEntryTemplate),

        render: function (options) {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });


    Sale.SaleView = Backbone.View.extend({

        render: function (options) {
            var v;
            this.$el.empty();
            _.each(this.collection.models, function(sale) {
                v = new Sale.SaleEntryView({model: sale});
                this.$el.append(v.render().$el);
            }, this);
            return this;
        }

    });

    return Sale;

});