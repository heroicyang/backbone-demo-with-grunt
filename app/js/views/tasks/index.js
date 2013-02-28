define([
  'text!templates/tasks/index.html',
  'views/tasks/task',
  'collections/tasks'
], function (template, TaskView, Tasks) {
  var TaskIndexView = Backbone.View.extend({
    tagName: 'div',
    className: 'row-fluid',
    template: _.template(template),

    events: {
      'click .add-task': 'addTask'
    },
    initialize: function () {
      this.children = [];
    },
    render: function () {
      this.$el.html(this.template());

      var $el = this.$('#task-list')
        , self = this;

      this.collection = new Tasks();
      this.collection.fetch({
        data: {
          tasklist: this.model.get('id')
        },
        success: function () {
          self.collection.each(function (task) {
            var item = new TaskView({
              model: task,
              parentView: self
            });
            $el.append(item.render().el);
            self.children.push(item);
          });
        }
      });

      return this;
    },
    addTask: function () {

    }
  });

  return TaskIndexView;
});