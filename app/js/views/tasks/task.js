define(['text!templates/tasks/task.html'], function (template) {
  var TaskView = Backbone.View.extend({
    tagName: 'li',
    className: 'controls well task row',
    template: _.template(template),

    events: {
      'click': 'open',
      'change .check-task': 'toggle'
    },
    initialize: function (options) {
      this.parentView = options.parentView;
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.remove, this);
    },
    render: function () {
      this.$el.data('taskId', this.model.get('id'));
      this.$el.html(this.template(this.model.toJSON()));
      this.$('.check-task').attr('checked', this.model.get('status') == 'completed');
      return this;
    },
    open: function () {
      if (this.parentView.activeTaskView) {
        this.parentView.activeTaskView.close();
      }
      this.$el.addClass('active');
      this.parentView.activeTaskView = this;
      this.parentView.editTask(this.model);
    },
    close: function () {
      this.$el.removeClass('active');
    },
    toggle: function (e) {
      this.model.set('status', $(e.currentTarget).attr('checked') ? 'completed' : 'needsAction');
      if (this.model.get('status') === 'needsAction') {
        this.model.set('completed', null);
      }

      this.model.save();
      return this;
    }
  });

  return TaskView;
});