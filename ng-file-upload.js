(function() {
  'use strict';

  angular.module('ngFileUpload', []).directive('ngFileUpload', ngFileUpload);

  ngFileUpload.$inject = [];

  function ngFileUpload() {
    var directive = {
        templateUrl: 'ng-file-upload.html',
        link: link,
        restrict: 'E',
        replace: true,
        scope: {
          
        }
    };

    return directive;

    function link(scope, element, attrs) {
      $('#upload-input').fileupload({
        dataType: 'json',
        add: function (event, data) {
          data.submit();
        },
        done: function (event, data) {
        },
        progressall: function (event, data) {
          $('#progress .bar').css(
            'width', parseInt(data.loaded / data.total * 100, 10) + '%'
          );
        }
      });
    }
  }
}());