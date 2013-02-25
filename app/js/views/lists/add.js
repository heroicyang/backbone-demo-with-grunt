define([
  'models/tasklist',
  'views/lists/edit'
], function (TaskList, EditListView) {
  var AddListView = EditListView.extend({
    submit: function () {
      var self = this
        , title = this.$('input[name="title"]').val();

      this.model.save({
        title: title
      }, {
        success: function (model) {
          bTask.collections.lists.add(model);
          self.remove();
        }
      });

      return false;
    }
  });

  return AddListView;
});