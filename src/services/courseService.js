const Course = require('../models/Course.js');

exports.createCourse = (title, description, imageUrl, isPublic) => {
    if(isPublic === 'on') {
        isPublic = true
    } else {
        isPublic = false
    }

    Course.create({title, description, imageUrl, isPublic});
}

exports.getAllPublicCourses = () => Course.find({ isPublic: true})