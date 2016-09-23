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
        scope: true
    };

    return directive;

    function link(scope, element, attrs) {
      scope.progress = 0;

      angular.element('#upload-input').fileupload({
        dataType: 'json',
        formData: {
          api_password: 'b77c7a89f6a0be676526fff0248baa4b4583b26f1c4d828b2336cf7010e780e6'
        },
        add: function (event, data) {
          scope.progress = 0;

          data.submit();
        },
        done: function (event, data) {
          console.log(data);
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