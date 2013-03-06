define([
  'text!templates/lists/menuitem.html',
  'views/tasks/index',
  'collections/tasks'
], function (template, TaskIndexView, Tasks) {
  var ListMenuItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'list-menu-item',
    template: _.template(template),

    events: {
      'click': 'open'
    },
    initialize: function () {
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.remove, this);
    },
    render: function () {
      this.$el.data('listId', this.model.get('id'));
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    open: function () {
      if (bTask.views.activeListMenuItem) {
        bTask.views.activeListMenuItem.$el.removeClass('active');
      }

      bTask.views.activeListMenuItem = this;
      this.$el.addClass('active');

      if (bTask.views.taskIndexView) {
        bTask.views.taskIndexView.remove();
      }

      bTask.views.taskIndexView = new TaskIndexView({
        collection: new Tasks({ tasklist: this.model.get('id') }),
        model: this.model
      });
      bTask.views.app.$('#task-container').html(bTask.views.taskIndexView.render().el);

      return false;
    }
  });

  return ListMenuItemView;
});