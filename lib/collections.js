import {Mongo} from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import {check} from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

Meteor.methods({
    'posts.insert'(text){
        check(text, String);

        //check if user is logged in
        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized');
        }

        Posts.insert({
            text: text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
          });
    },

    'posts.remove'(post){
        check(post._id, String);

        if(post.owner !== Meteor.userId()){
            throw new Meteor.Error('not-authorized')
        }

        Posts.remove(post._id);
    }
})