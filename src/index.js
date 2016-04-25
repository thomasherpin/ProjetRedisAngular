var angular = require('angular');
var $ = require('jquery');
var _ = require('lodash');

angular.module('RedisKnowledgeDatabaseApp', []);

angular
  .module('RedisKnowledgeDatabaseApp')
  .controller('LinksController', ['$scope', '$window', function($scope, $window){
    this.links = [];  //
    this.tags = [];

    const DISPLAYED_LINKS_COUNT = 10;
    var PAGE = 0;
    this.displayedLinks = []; //

    /*this.research = function(item){
    	// return item.filter(item, function(link){return _.includes(this.research);});
	   	this.displayedLinks = _.filter(this.links, function(link){
        	return _.includes(link.tags, item);
      	});
	   	// this.updatePagination();
    };*/

    this.setLinks = function(links){
    	this.links = links;
    	this.displayedLinks = links;
		const rawTags = _.chain(this.links).map(
	        (e) => e.tags)
	        .join(' ')
	        .split(' ')
	        .countBy()
	        .toPairs()
	        .sortBy((v) => v[1])
	        .reverse()
	        .value();
		const EXCLUDE_TAGS = ['redis', 'redis-nl-reading'];

    	this.tags = rawTags.filter(pair => {
			  return !_.includes(EXCLUDE_TAGS, pair[0]) && pair[1] > 1;
			}).map(function(element, i){
			  return {
			    name: _.replace(element[0], "redis-" , ""),
			    number: element[1]
			  };
		});
    };
      	
    this.addTagFilter = function(tag){
    	//console.log(this);
    	this.displayedLinks = _.filter(this.links, function(link){
        	return _.includes(link.tags, tag.name);
      	});
      	console.log(this.displayedLinks);
      	//this.displayedLinks = this.displayedLinks.slice(PAGE*DISPLAYED_LINKS_COUNT, (PAGE+ 1)* DISPLAYED_LINKS_COUNT);
//      	this.link = this.displayedLinks;
//      	this.updatePagination();
    };

    this.clearTagFilter = function(){
//    	console.log(this);
    	this.displayedLinks = this.links;
    	this.updatePagination();
    };

    this.updatePagination = function(){
      this.displayedLinks = this.displayedLinks.slice(PAGE*DISPLAYED_LINKS_COUNT, (PAGE+ 1)* DISPLAYED_LINKS_COUNT);
      console.log(this.displayedLinks);
    };

    this.next = function(){
      PAGE++;
      this.updatePagination();
    };

    this.open = function(link){
      //console.log(link);
      $window.open(link.href, '_blank');
    };

  	/*this.href = function(link){
  	 	//ouvrir sur un nouvel onglet
  	 	console.log(link.description);
  	};*/

    this.previous = function(){
      PAGE--;
      this.updatePagination();
    };

    $.get('/api/links').then(function(links) {
      this.setLinks(links);
      this.updatePagination();
      $scope.$apply();
    }.bind(this));

  }]);

//
