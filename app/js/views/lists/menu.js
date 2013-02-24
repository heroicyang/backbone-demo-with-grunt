define(['views/lists/menuitem'], function (ListMenuItemView) {
  var ListMenuView = Backbone.View.extend({
    el: '.left-nav',
    tagName: 'li',
    className: 'nav nav-list lists-nav',

    events: {

    },
    initialize: function () {
      this.collection.on('add', this.render, this);
    },
    render: function () {
      var self = this;
      this.collection.each(function (list) {
        var item, sidebarItem;
        item = new ListMenuItemView({
          model: list
        });
        self.$el.append(item.render().el);
      });
      return this;
    }
  });

  return ListMenuView;
});