/**
 * Toasts controller. Display and remove toast messages.
 * @param $scope
 * @param $rootScope
 * @param $timeout
 */
controllers.toasts = function($scope, $rootScope, $timeout) {

	var delay = 3500;
	var anim = 1000;

	$scope.toasts = [];

	$scope.close = function(index) {

		$timeout.cancel($scope.toasts[index].timeout);

		$scope.toasts[index].enabled = false;

		$timeout(function() {
			$scope.toasts.splice(index, 1);
		}, anim);
	};

    $scope.$on("toast", function(event, toast) {

        toast.index = $scope.toasts.length;
        toast.enabled = true;
        toast.timeout = $timeout(function() {

            toast.enabled = false;

            $timeout(function() {
                $scope.toasts.splice(toast.index, 1);
            }, anim);

        }, delay);

        $scope.toasts.push(toast);

        $scope.$apply();
	});
};

/**
 * Dependencies
 * @type {string[]}
 */
controllers.toasts.$inject = ["$scope", "$rootScope", "$timeout"];