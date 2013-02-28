define(['text!templates/tasks/task.html'], function (template) {
  var TaskView = Backbone.View.extend({
    tagName: 'li',
    className: 'controls well task row',
    template: _.template(template),

    events: {
      'click': 'open'
    },
    initialize: function (options) {
      this.parentView = options.parentView;
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
    },
    close: function () {
      this.$el.removeClass('active');
    }
  });

  return TaskView;
});