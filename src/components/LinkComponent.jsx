const React = require('react');


function filterMultiple(){
  alert('ok');
}

module.exports = React.createClass({
 displayName: 'Link',
 render: function() {
   return (
     <div className="link">
      <h3><a>{this.props.title}</a></h3>
      <p>{this.props.description}</p>
      <button onClick={filterMultiple}>{this.props.nom}</button>
     </div>
   );
 }
});
