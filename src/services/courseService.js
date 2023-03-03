const Course = require('../models/Course.js');

exports.createCourse = (title, description, imageUrl, isPublic, owner) => {
    if(isPublic === 'on') {
        isPublic = true
    } else {
        isPublic = false
    }

    Course.create({title, description, imageUrl, isPublic, owner});
}

exports.addUser = (courseId, userId) => {
    return Course.findByIdAndUpdate(courseId,
        {
            $push: {enrolledUsers: userId}
        },
        {runValidators: true});
}

exports.editCourse = (courseId, newData) => {
    if(newData.hasOwnProperty('isPublic')) {
        newData.isPublic = true
    } else {
        newData.isPublic = false
    }
    
    return Course.findByIdAndUpdate(courseId, newData);
}

exports.deleteCourse = (id) => Course.findByIdAndDelete(id);

exports.getAllPublicCourses = () => Course.find({ isPublic: true}).lean();

exports.getCourse = (id) => Course.findOne({ _id: id }).lean();