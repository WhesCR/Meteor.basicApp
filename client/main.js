import { Template } from 'meteor/templating';
import { Posts } from '../lib/collections.js';
import {Accounts} from 'meteor/accounts-base';

//acounts config
Accounts.ui.config({
  passwordSignupFields:'USERNAME_ONLY'
});

import './main.html';


Template.body.helpers({
  posts() {
    return Posts.find({});
  }

});

Template.add.events({
  'submit .add-form':function(){
    event.preventDefault();

    // get input value
    const target = event.target;
    const text = target.text.value;


    Meteor.call('posts.insert', text);

    //clear form
    target.text.value = '';

    //close modal
    $('#addModal').modal('close');
        
    return false;
  }
})

Template.post.events({
  'click .delete-note'  : function(){
    Meteor.call('posts.remove', this);
    return false;
  }
})