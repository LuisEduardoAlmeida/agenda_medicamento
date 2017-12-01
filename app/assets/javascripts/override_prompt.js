$(document).ready(function() {
  (function() {
    var allowAction;

    $.rails.prompt = function(message, defaultValue) {
      return window.prompt(message, defaultValue);
    };

    $.rails.handlePrompt = function(element) {
      var callback, config, defaultValue, message, param, params, value;
      config        = element.data('prompt');
      message       = config.message || config;
      defaultValue  = config["default"] || '';
      param         = config.param || 'value';
      if (!message) {
        return true;
      }
      if ($.rails.fire(element, 'prompt')) {
        myCustomPromptBox(message, function(valor) {
          callback = $.rails.fire(element, 'prompt:complete', [valor]);
            console.log(valor)
            if(valor != null) {
              var oldAllowAction  = $.rails.allowAction;
              params        = element.data('params') || {};
              params[param] = valor;
              element.data('params', params);
              $.rails.allowAction = function() { return true; };
              element.trigger('click');
              $.rails.allowAction = oldAllowAction;
              return true
            }else{
              return false
            }
          });
      }
      return false
    };

    allowAction = $.rails.allowAction;

    $.rails.allowAction = function(element) {
      if (element.data('prompt')) {
        return $.rails.handlePrompt(element);
      } else {
        return allowAction(element);
      }
    };

    function myCustomPromptBox(message, callback) {
      bootbox.prompt({
        title: message,
        callback: function(result) {
          callback(result);
        }
      });
    }    

  }).call(this);
})