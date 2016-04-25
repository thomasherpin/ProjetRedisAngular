/*const fs = require('fs');
const jsonContent = JSON.parse(fs.readFileSync("reading.json"));
var countredis;
for (var data in jsonContent)
{
for (var info in jsonContent[data])
{
if(info == "tags")
{
console.log("tags: " + jsonContent[data][info].replace("redis",""));

}
if (jsonContent[data][info].search("redis-nl-reading"))
{
countredis += 1;
}
}
}
console.log(countredis);*/

var _ = require('lodash');
var entries = require('./reading.json');
var search = ['java', 'python', 'youporn', 'C#'];
//var test = _.sortBy(_.toPairs(_.countBy(entries.map((e) => e.tags).join(' ').split(' '))), (v) => v[1]);
//console.log(_.sortBy(_.isEqual(entries.map((e) => e.tags), search)));

//console.log(_.isEqual(_([1,2,3,4]).forEach(), search));

/*test.forEach(function (value){
  if (_.isEqual(value[1], 1) == false){
    console.log(value);
  }

})*/

var tag = _.chain(entries).map((e) => e.tags).join(' ').split(' ').countBy().toPairs().sortBy((v) => v[1]).value();

tag.forEach(function(value) {
  var replace = [_.replace(value[0], "redis-", ""), value[1]];
  console.log(replace);
});