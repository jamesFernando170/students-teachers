/**Dto*/
const teacherDto = require("../../model/dto/teacher.dto");
const userDto = require("../../model/dto/user.dto");
const config = require("config");

/**Helper */
const helper = require("../helpers/general.helper");
const notification = require("../helpers/notification.helper");

exports.createTeacher = (req, res, next) => {
    //const { code, name, lastname, email, phone, career, password } = req.body;
    let teacher = {
        document: req.body.document,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        office: req.body.office,
        deparment: req.body.deparment
    };
    teacherDto.create(teacher, (err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        const r = config.get("roles").teacher;
        let user = {
            name: teacher.name,
            lastname: teacher.lastname,
            username: teacher.document,
            password: helper.EncryptPassword(req.body.password),
            rol: r
        };
        userDto.create(user, (err, u) => {
            if (err) {
                userDto.delete({ _id: data._id }, (err, data) => {
                    return res.status(400).json(
                        {
                            error: err
                        }
                    );
                });

            }
            notification.sendSMS(teacher.phone);
            res.status(201).json(
                {
                    info: data
                }
            );
        });
    });
};

exports.UpdateTeacher = (req, res, next) => {
    let teacher = {
        document: req.body.document,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        office: req.body.office,
        deparment: req.body.deparment
    };
    teacherDto.update({ _id: req.body.id }, teacher, (err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        if (req.body.olddocument != undefined) {
            const r = config.get("roles").teacher;
            let user = {
                name: teacher.name,
                lastname: teacher.lastname,
                username: teacher.document,
                password: helper.EncryptPassword(req.body.password),
                rol: r
            };
            userDto.update({username:req.body.olddocument}, user, (err, u) => {
                if (err) {
                    return res.status(400).json(
                        {
                            error: err
                        }
                    );
                }
                notification.sendSMS(teacher.phone);
                return res.status(201).json(
                    {
                        info: data
                    }
                );
            });
        }
        res.status(201).json(
            {
                info: data
            }
        );
    });
};

exports.getAll = (req, res, next) => {
    teacherDto.getAll({}, (err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        res.status(200).json(
            {
                info: data
            }
        );
    });
};

exports.getByDocument = (req, res, next) => {
    teacherDto.getByDocument({ document: req.params.document }, (err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        res.status(200).json(
            {
                info: data
            }
        );
    });
};


exports.deleteTeacher = () => {
    teacherDto.delete({ _id: req.body.id }, (err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        res.status(204).json();
    });
}

