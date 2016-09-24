(function() {
  'use strict';

  angular.module('ngFileUpload', []).directive('ngFileUpload', ngFileUpload);

  ngFileUpload.$inject = ['$http', '$timeout', '$sce'];

  function ngFileUpload($http, $timeout, $sce) {
    var directive = {
        templateUrl: 'ng-file-upload.html',
        link: link,
        restrict: 'E',
        replace: true,
        scope: true
    };

    return directive;

    function link(scope, element, attrs) {
      var api_password = 'b77c7a89f6a0be676526fff0248baa4b4583b26f1c4d828b2336cf7010e780e6';
      scope.progress = 0;

      angular.element('#upload-input').fileupload({
        dataType: 'json',
        formData: {
          api_password: api_password
        },
        add: function (event, data) {
          scope.progress = 0;

          data.submit();
        },
        done: function (event, data) {
          var hashed_id = data.result.hashed_id;

          if (hashed_id) {
            loadVideo(hashed_id);
          }
        },
        progressall: function (event, data) {
          scope.$apply(function () {
            scope.progress = parseInt(data.loaded / data.total * 100, 10);
          });
        }
      });

      function loadVideo(hashed_id) {
        $http.get('https://api.wistia.com/v1/medias/' + hashed_id + '.json?api_password=' + api_password).then(function (response) {
          console.log(response.data);
          if (response.data.status === 'ready') {
            scope.embedUrl = $sce.trustAsResourceUrl('http://fast.wistia.net/embed/iframe/' + hashed_id);
          } else {
            if (response.data.status !== 'failed') {
              $timeout(loadVideo(hashed_id), 5000);
            }
          }
        });
      }
    }
  }
}());