function mainController($scope, todoFactory, $filter, $location) {
	$scope.status = '';
	$scope.newTodoTitle = '';
	$scope.daysOldNumber = null;
	$scope.sortType = '';

	$scope.$watch('status', function () {
		$scope.statusFilter = ($scope.status === 'active') ?
			{ completed: false } : ($scope.status === 'completed') ?
			{ completed: true } : {};
	}, true)

	$scope.$watch('daysOldNumber', function () {
		var daysOldNumber = +$scope.daysOldNumber;
		if ($scope.daysOldNumber &&
		angular.isNumber(daysOldNumber) &&
		!isNaN($scope.daysOldNumber)) {
			$scope.daysOldFilter = function (location) {
				var date = new Date(location.date);
				var minDate = new Date();

				minDate.setDate(minDate.getDate() - daysOldNumber);

				return date >= minDate;
			};
		} else {
			$scope.daysOldFilter = undefined;
		}
	}, true)

	$scope.removeTodo = function(id) {
		todoFactory.removeTodo(id);
	}

	$scope.toggleTodo = function(id) {
		todoFactory.toggleTodo(id);
	}

	$scope.changeShowFilter = function(status) {
		$scope.status = status;
	}

	$scope.changeTodoSortType = function(type) {
		$scope.sortType = type;
	}

	$scope.activateEditTodo = function(id) {
		$scope.newTodoTitle = $scope.todos.find(elem => elem.id === id).title;
		$location.url('/todo/edit/'+id);
	}
}
mainController.$inject = ['$scope', 'todoFactory', '$filter', '$location'];

export {mainController};