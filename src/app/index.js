import '../styles/main.scss';
import { addEditController } from './components/addEditTodo/add-or-edit-todo.ctrl.js';
import { mainController } from './components/main/main.ctrl.js';
import addValidationDir from './directives/addValidation.js'

var app = angular.module('toDoApp', ['ngRoute', 'ngMessages']);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: './src/app/components/main/main.tpl.htm',
		controller: 'mainController'
	})
	.when('/todo/add', {
		templateUrl: './src/app/components/addEditTodo/add-or-edit-todo.tpl.htm',
		controller: 'addEditController'
	})
	.when('/todo/edit/:id', {
		templateUrl: './src/app/components/addEditTodo/add-or-edit-todo.tpl.htm',
		controller: 'addEditController'
	})
	.otherwise({redirectTo: '/'})

	$locationProvider.html5Mode(true);
});

app.directive('addValidation', addValidationDir);

app.factory('todoFactory', function(){
	var todoList = [
			{
				id: '_7',
				title: 'Urururu',
				completed: false,
				date: 1521369559773
			},{
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
				id: '_3',
				title: 'Kolkata',
				completed: false,
				date: 1521196759773
			},{
				id: '_6',
				title: 'Kekeke',
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

app.controller('toDoController', ['$scope', 'todoFactory', '$filter', function ($scope, todoFactory, $filter) {
	$scope.todos = todoFactory.getTodos();

	$scope.$watch('todos', function () {
		$scope.remainingTasksCount = $filter('filter')($scope.todos, { completed: false }).length;
		$scope.completedTasksCount = $scope.todos.length - $scope.remainingTasksCount;
	}, true)
}]);

app.controller('mainController', mainController);
app.controller('addEditController', addEditController);