angular.module('app')
  .controller('LoginCtrl', [
    '$scope',
    '$http',
    '$state',
    'settings',
    'Utils',
    'AuthService',
    function($scope, $http, $state, settings, Utils, AuthService) {
      // Is registration open?
      const Settings = settings.data;
      $scope.regIsOpen = Utils.isRegOpen(Settings);

      // Start state for login
      $scope.loginState = 'login';

      function onSuccess() {
        $state.go('app.dashboard');
      }

      function onError(data) {
        $scope.error = data.message;
      }

      function resetError() {
        $scope.error = null;
      }

      $scope.login = function() {
        resetError();
        AuthService.loginWithPassword(
          $scope.email, $scope.password, onSuccess, onError);
      };

      $scope.register = function() {
        resetError();
        AuthService.register(
          $scope.email, $scope.password, onSuccess, onError);
        if ($scope.error !== null) {
          sweetAlert({
            title: 'Registration complete!',
            text: 'An email should be sent to you shortly.',
            type: 'success',
            confirmButtonColor: '#e76482'
          });
        }
      };

      $scope.setLoginState = function(state) {
        $scope.loginState = state;
        resetError();
      };

      $scope.sendResetEmail = function() {
        const email = $scope.email;
        if (!email || email.length === 0) {
            onError({ message: 'Email must be a string.' });
            return;
        }
        AuthService.sendResetEmail(email);
        sweetAlert({
          title: "Don't Sweat!",
          text: 'An email should be sent to you shortly.',
          type: 'success',
          confirmButtonColor: '#e76482'
        });
      };
    }
  ]);
