function addEditController($scope, todoFactory, $routeParams, $location) {
	$scope.todoSubmited = false;
	$scope.changingTodoId = $routeParams.id || '';
	$scope.addTodo = function () {
		var newTodo = {
			id: '_' + Math.random().toString(36).substr(2, 9),
			title: $scope.newTodoTitle,
			completed: false,
			date: (new Date()).getTime()
		};

		if (!newTodo.title) {
			$scope.todoSubmited = false;
			return;
		};

		todoFactory.addTodo(newTodo)
		$scope.newTodoTitle = '';
		$scope.todoSubmited = true;
		$location.url('/');
	};

	$scope.editTodo = function() {
		var newTitle = $scope.newTodoTitle;
		if (!newTitle) {
			$scope.todoSubmited = false;
			return;
		};
		todoFactory.changeTodoTitle($scope.changingTodoId, newTitle);
		$scope.newTodoTitle = '';
		$scope.todoSubmited = true;
		$scope.changingTodoId = '';
		$location.url('/');
	}
}
addEditController.$inject = ['$scope', 'todoFactory', '$routeParams', '$location'];

export {addEditController};