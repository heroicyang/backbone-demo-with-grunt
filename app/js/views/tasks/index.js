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
      'submit .add-task': 'addTask'
    },
    initialize: function () {
      this.children = [];
      this.collection.on('add', this.renderTask, this);
    },
    render: function () {
      this.$el.html(this.template());

      var $el = this.$('#task-list')
        , self = this;

      this.collection.fetch({
        data: {
          tasklist: this.model.get('id')
        },
        success: function () {
          self.collection.each(function (task) {
            task.set('tasklist', self.model.get('id'));
            self.renderTask(task);
          });
        }
      });

      return this;
    },
    addTask: function () {
      var $input = this.$('input[name="title"]')
        , task = new this.collection.model({ tasklist: this.model.get('id') })
        , self = this;

      task.save({
        title: $input.val()
      }, {
        success: function (model) {
          self.collection.add(model, { at: 0 });
        }
      });

      $input.val('');
      return false;
    },
    renderTask: function (task, list, options) {
      var item = new TaskView({
            model: task,
            parentView: this
          })
        , $el = this.$('#task-list');

      if (options && options.at === 0) {
        $el.prepend(item.render().el);
      } else {
        $el.append(item.render().el);
      }

      this.children.push(item);
    }
  });

  return TaskIndexView;
});