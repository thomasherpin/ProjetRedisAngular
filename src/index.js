var angular = require('angular');
var $ = require('jquery');
var _ = require('lodash');

angular.module('RedisKnowledgeDatabaseApp', []);

angular
  .module('RedisKnowledgeDatabaseApp')
  .controller('LinksController', ['$scope', function($scope){
    this.links = [];  //
    const DISPLAYED_LINKS_COUNT = 10;
    var PAGE = 0;
    this.displayedLinks = []; //

    const list = _.chain(this.links).map((e) => e.tags).join(' ').split(' ').countBy().toPairs().sortBy((v) => v[1]).value();
    this.tagsRedis = list.map(function(element){ return [_.replace(element[0], "redis-", ""), element[1]]; });

    this.updatePagination = function(){
      this.displayedLinks = this.links.slice(PAGE*DISPLAYED_LINKS_COUNT, (PAGE+ 1)* DISPLAYED_LINKS_COUNT);
    };

    this.next = function(){
      PAGE++;
      this.updatePagination();
    };

    this.open = function(link){
      console.log(link);
    };

    this.previous = function(){
      PAGE--;
      this.updatePagination();
    };

    $.get('/api/links').then(function(links) {
      this.links = links;
      this.updatePagination();
      $scope.$apply();
    }.bind(this));

  }]);

//
