define([
  'text!templates/app.html',
  'views/lists/add',
  'views/lists/edit'
], function (template, AddListView, EditListView) {
  var AppView = Backbone.View.extend({
    id: 'main',
    tagName: 'div',
    className: 'container-fluid',
    el: 'body',
    template: _.template(template),

    events: {
      'click #add-list-button': 'addList',
      'click #edit-list-button': 'editList'
    },
    initialize: function () {

    },
    render: function () {
      this.$el.html(this.template());
      return this;
    },
    addList: function () {
      var form = new AddListView({ 
        model: new bTask.collections.lists.model({ title: '' }) 
      });
      return this.listForm(form);
    },
    editList: function () {
      var form = new EditListView({ 
        model: bTask.views.activeListMenuItem.model
      });
      return this.listForm(form);
    },
    listForm: function (form) {
      this.$('#list-editor').html(form.render().el);
      this.$('input:first').focus();

      return false;
    }
  });

  return AppView;
});