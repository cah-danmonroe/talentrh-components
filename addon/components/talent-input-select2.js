import Ember from 'ember';
import layout from '../templates/components/talent-input-select2';
import _ from 'lodash';

export default Ember.Component.extend({
  layout,
  classNames: 'talent-input-validation talent-input-select2',
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  showStartValue: true,

  didInsertElement() {
    this.loadSelect();
  },

  loadSelect() {
    let config = Ember.getOwner(this).resolveRegistration('config:environment');
    let select = this.$('select');
    let tokenProperty = (this.get('tokenProperty') || 'token');
    let disabled = this.get('disabled');

    select.attr('disabled', disabled);

    select.select2({
      language: 'pt-BR',
      width: '100%',
      ajax: {
        headers: {
          'Authorization': 'Bearer ' + this.get('session.session.content.authenticated.' + tokenProperty),
          'Content-Type': 'application/json',
        },
        delay: 300,
        url: config.apiBaseUrl + this.get('endpoint'),
        processResults: (data)=> {
          return {
            results: $.map(data, (obj)=> {
              obj.text = this.buildTextShow(obj);
              return obj;
            })
          };
        }
      }
    });

    select.on('select2:select', (evt) => {
      if (this.get('ajax')) {
        this.set('selected', _.first(select.select2('data')));
      } else {
        let selectedProperty = this.get('selectedProperty');
        this.get('store')
          .findRecord(this.get('modelName'), evt.target.value)
          .then((found)=> {
            this.set('showStartValue', null);
            if (found && selectedProperty) {
              this.set('selected', found.get(selectedProperty));
            } else {
              this.set('selected', found);
            }
          });
      }
    });
  },

  buildTextShow(obj) {
    let showProperties = this.get('showProperties');
    let splited = showProperties.split('|');
    let textShow = '';

    if (!obj || !showProperties) {return;}
    splited.forEach((item)=> {
      textShow += obj[item] || item;
    });

    return textShow;
  },

  actions: {
    clearSelect() {
      this.set('selected', null);
      this.$('select').val('').trigger('change');
      this.set('showStartValue', true);
    },

    buttonNew() {
      this.sendAction('onButtonNew', this.get('inputType'));
    }
  },

  onChangeSelected: Ember.observer('selected', function() {
    let select = this.$('select');
    let select2Selected = _.first(select.select2('data'));
    let selected = this.get('selected');

    if (!selected) {
      select.val('').trigger('change');
      this.set('showStartValue', true);
      return;
    }

    if (!select2Selected || !selected.get) {return;}

    if (parseInt(select2Selected.id) !== parseInt(selected.get('id'))) {
      select.val('').trigger('change');
      this.set('showStartValue', true);
    } else {
      this.set('showStartValue', false);
    }
  }),

  onDisableSelected: Ember.observer('disabled', function() {
    let select = this.$('select');
    let disabled = this.get('disabled');
    select.attr('disabled', disabled);
  })
});
