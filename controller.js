var page = angular.module('list', ['ui.router']);

page.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('setting', {
			url: '/setting',
			templateUrl: 'setting.html',
		}).state('report', {
			url: '/report',
			templateUrl: 'report.html'
		});
	$urlRouterProvider.otherwise('/report');
})

page.controller('list_ctrl', ['$scope', '$http', function($scope, $http) {
	$http.get('http://47.106.85.62:8880/getAllReportsCountFromMemory').then(function(res) {
		$scope.count = res.data;
		console.log(res.data);
	});
	$scope.tips = '执行定时巡检';
	if (localStorage.getItem('reports') == null) {
			$http.get('http://47.106.85.62:8880/Reports?pageNum=1').then(function(res) {
			$scope.reports = res.data;
			localStorage.setItem('reports',JSON.stringify(res.data))
			console.log(JSON.stringify(localStorage.getItem('reports',res.data)))
			console.log(localStorage.getItem('reports'))
			if (res.data.length == 0) {
				$scope.msg = '暂无报告记录';
				$scope.show = false;
			} else {
				$scope.show = true;
			}
		});
	}else{
		$scope.reports = JSON.parse(localStorage.getItem('reports'));
		console.log(JSON.parse(localStorage.getItem('reports')))
		if ((localStorage.getItem('reports') == null)) {
			$scope.msg = '暂无报告记录';
			$scope.show = false;
		} else {
			$scope.show = true;
		}

	}

	$scope.search = function(keyword) {
		$http.get('http://47.106.85.62:8880/Search?keyword=' + $scope.keyword).then(function(res) {
			$scope.reports = res.data;
		});
	}

	$scope.refresh = function() {
		localStorage.removeItem('reports')
		$http.get('http://47.106.85.62:8880/Import').then(function(res) {
			$http.get('http://47.106.85.62:8880/Reports?pageNum=1').then(function(res) {
				console.log(res.data);
				$scope.reports = res.data;
			});
			$http.get('http://47.106.85.62:8880/AllReportsCount').then(function(res) {
				$scope.count = res.data.count;
			});
			alert('刷新完成');
		})
	}

	$scope.excute = function() {
		$http.get('http://47.106.85.62:8880/AutomaticalTest?systemName=YQ8').then(function(res) {
			console.log(res.data.message);
			alert(res.data.message);
		});
	}

	$scope.scheduleExecute = function(){
		$http.get('http://47.106.85.62:8880/scheduleExecute').then((res)=>{
			alert('执行时刻：'+res.data);
		});
		$scope.tips = '等待执行中...';
	}

	$scope.pageNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	$scope.changePage = function(events) {
		var pn = events.target.innerHTML;
		$http.get('http://47.106.85.62:8880/Reports?pageNum=' + pn).then(function(res) {
			if (res.data.length == 0) {
				alert('没有那么多报告!');
				return;
			}
			console.log(res.data);
			$scope.reports = res.data;
		});
	}
}]);

page.controller('setting_ctrl', ['$http', '$scope', function($http, $scope) {
	$scope.saveTask = function() {
		var stime = angular.element('#st').val().toString();
		var etime = angular.element('#et').val().toString();
		var timesOfDay = $scope.timesOfDay;
		$http.get('http://47.106.85.62:8880/saveTask?stime=' + stime + '&etime=' + etime + '&timesOfDay=' + timesOfDay).then(function(res) {
			alert(res.data);
		});
	}

	$http.get('http://47.106.85.62:8880/getTask').then((res)=>{
		$scope.st = new Date(res.data[0].stime);
		$scope.et = new Date(res.data[0].etime);
		$scope.timesOfDay = res.data[0].timesOfDay;
		console.log(res.data[0]);
	});
}]);