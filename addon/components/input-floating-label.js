import Ember from 'ember';

export default Ember.TextField.extend({
  classNames: ['form-control'],

  didInsertElement() {
    this.floatLabel();
  },

  onChangeValue: Ember.observer('value', function () {
    this.floatLabel();
  }),

  floatLabel() {
    let input = Ember.$('#' + this.get('elementId'));

    if (this.get('value') || this.get('value') === 0) {
      input.addClass('static').addClass('dirty');
    } else {
      input.removeClass('static').removeClass('dirty');
    }
  }
});
