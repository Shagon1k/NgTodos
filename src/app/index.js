//import '../styles/main.scss';


//['ngRoute', 'ngResource']'ngMessages', 
var app = angular.module('toDoApp', ['ngRoute', 'ngMessages']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/todo/add', {
			templateUrl: './src/app/add-or-edit-todo.htm',
			controller: 'toDoController'
		})
		//.when('/article/add', {
		//	
		//})
		.otherwise({redirectTo: '/'})
});

app.directive('addValidation', function () {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, element, attr, ctrl) {
			function validator(ngModelValue) {
				if (ngModelValue.length <= 10) {
					ctrl.$setValidity('maxLengthValidator', true);
				} else {
					ctrl.$setValidity('maxLengthValidator', false);
				}
				if (ngModelValue.length > 0) {
                    ctrl.$setValidity('requiredValidator', true);
                } else {
                    ctrl.$setValidity('requiredValidator', false);
                }
				return ngModelValue;
			}
			ctrl.$parsers.push(validator);
		}
	};
});

app.factory("todoFactory", function(){
	var todoList = [
			{
				id: '_1',
				title: 'New Delhi',
				completed: false,
				date: 1521110359773
			},{
				id: '_2',
				title: 'Mumbai',
				completed: false,
				date: 1521110359773
			},{
				id: '_3',
				title: 'Kolkata',
				completed: false,
				date: 1521196759773
			},{
				id: '_4',
				title: 'Chennai',
				completed: false,
				date: 1521196759773
			},{
				id: '_5',
				title: 'Ololo',
				completed: false,
				date: 1521283159773
			},{
				id: '_6',
				title: 'Kekeke',
				completed: false,
				date: 1521369559773
			},{
				id: '_7',
				title: 'Urururu',
				completed: false,
				date: 1521369559773
			}
		];

	return {
		getTodos: function getTodos() {
			 return todoList;
		},
		addTodo: function addTodo(newTodo) {
			todoList.push(newTodo);
		},
		removeTodo: function removeTodo(id) {
			var index = todoList.findIndex(elem => elem.id === id);
			todoList.splice(index, 1);
		},
		changeTodoTitle: function(todoId, newTitle) {
			var index = todoList.findIndex(elem => elem.id === todoId);
			todoList[index].title = newTitle;
		},
		toggleTodo: function checkTodo(id) {
			todoList.forEach((elem, index) => {
				if(elem.id === id) {
					elem.completed = !elem.completed;
				}
			});
		}
	};
});



app.controller('toDoController', ['$scope', 'todoFactory', '$filter', '$location', function ($scope, todoFactory, $filter, $location) {
	$scope.todos = todoFactory.getTodos();
	$scope.status = '';
	$scope.newTodoTitle = '';
	$scope.daysOldNumber = null;
	$scope.todoSubmited = false;
	$scope.changingTodoId = '';

	$scope.$watch('todos', function () {
		$scope.remainingTasksCount = $filter('filter')($scope.todos, { completed: false }).length;
		$scope.completedTasksCount = $scope.todos.length - $scope.remainingTasksCount;
	}, true)

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
	};

	$scope.removeTodo = function(id) {
		todoFactory.removeTodo(id);
	}

	$scope.toggleTodo = function(id) {
		todoFactory.toggleTodo(id);
	}

	$scope.changeShowFilter = function(status) {
		$scope.status = status;
	}

	$scope.activateEditTodo = function(id) {
		$scope.newTodoTitle = $scope.todos.find(elem => elem.id === id).title;
		$scope.changingTodoId = id;
	}

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
	}
}]);

