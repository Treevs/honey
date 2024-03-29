import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../../api/tasks.js'

import template from './todosList.html';
 
class TodosListCtrl {
  constructor($scope) {
    $scope.viewModel(this);
    
    this.subscribe('tasks');


    this.hideCompleted = false;

    this.helpers({
      tasks() {
        const selector = {};
 
        // If hide completed is checked, filter tasks
        if (this.getReactively('hideCompleted')) {
          selector.checked = {
            $ne: true
          };
        }
        // Show newest tasks at the top
        return Tasks.find(selector, {
          sort: {
            points: -1
          }
        });
      },
      incompleteCount() {
        return Tasks.find({
          checked: {
            $ne: true
          }
        }).count();
      },
      currentUser() {
        return Meteor.user();
      }
    })
  }
  addTask(newTask) {
    // Insert a task into the collection
    Meteor.call('tasks.insert', newTask);

    // Clear form
    this.newTask = '';
  }

  setChecked(task) {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', task._id, !task.checked);
  }

  removeTask(task) {
    Meteor.call('tasks.remove', task._id);
  }

  upvote(task) {
    Meteor.call('tasks.upvote', task._id);
  }

  updateDetails(task, summary) {
    Meteor.call('tasks.updateDetails', task._id, summary);
  }


}
 
export default angular.module('todosList', [
  angularMeteor
])
  .component('todosList', {
    templateUrl: 'imports/components/todosList/todosList.html',
    controller: ['$scope', TodosListCtrl]
  });