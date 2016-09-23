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
      scope.progress = 0;

      angular.element('#upload-input').fileupload({
        dataType: 'json',
        add: function (event, data) {
          scope.progress = 0;
          data.submit();
        },
        done: function (event, data) {
        },
        progressall: function (event, data) {
          scope.$apply(function () {
            scope.progress = parseInt(data.loaded / data.total * 100, 10);
          });
        }
      });
    }
  }
}());