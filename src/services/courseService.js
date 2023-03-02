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

exports.getAllPublicCourses = () => Course.find({ isPublic: true}).lean();

exports.getCourse = (id) => Course.findOne({ _id: id }).lean();