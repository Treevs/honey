import angular from 'angular';
import angularMeteor from 'angular-meteor';
import todosList from '../imports/components/todosList/todosList';
import '../imports/startup/accounts-config.js';

 
angular.module('simple-todos', [
  angularMeteor,
  todosList.name,
  'accounts.ui'
]);

function onReady() {
  angular.bootstrap(document, ['simple-todos']);
}
 
if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}

var width = window.innerWidth
                    || document.documentElement.clientWidth
                    || document.body.clientWidth;

        var height = window.innerHeight
                    || document.documentElement.clientHeight
                    || document.body.clientHeight;
        
        var rowWidth = width/104
        var numOfRows = height /52;
        var hexagons = document.getElementById("hexagons");
        for( var i=0; i<numOfRows; i++) {
            var row = document.createElement("div")
            if(i%2 == 0)
                row.className = "hex-row even";
            else
                row.className = "hex-row";

            for(var j=0; j<rowWidth; j++) {
                var hexagon = createHexagon();
                row.appendChild(hexagon);
            }
            hexagons.appendChild(row);
        }

        function createHexagon() {

            var colors = ["D9B611", "F3C13A", "F7CA18", "E2B13C", "A17917", "F5D76E", "F4D03F", "FFA400", "E08A1E" , 
                            "FFB61E", "FAA945", "FFA631", "FFB94E", "E29C45", "CA6924", "F5AB35"]; //Not pictured: #F9690E
            var randomColor = "#" + colors[Math.floor(Math.random()*colors.length)]; 
            var hexagon = document.createElement("div");
            hexagon.className = "hexagon";
            var top = document.createElement("div");
            top.className = "hex-top";
            top.style.borderBottomColor = randomColor;
            
            var middle = document.createElement("div");
            middle.className = "hex-middle";
            middle.style.background = randomColor;
            
            var bottom = document.createElement("div");
            bottom.className = "hex-bottom";
            bottom.style.borderTopColor = randomColor;

            hexagon.appendChild(top);
            hexagon.appendChild(middle);
            hexagon.appendChild(bottom);

            return hexagon;

        }