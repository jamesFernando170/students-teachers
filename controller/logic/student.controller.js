/**Dto*/
const studentDto = require("../../model/dto/student.dto");
const userDto = require("../../model/dto/user.dto");
const config = require("config");

/**Helper */
const helper = require("../helpers/general.helper");
const notification = require("../helpers/notification.helper");

exports.createStudent = (req, res, next) => {
    //const { code, name, lastname, email, phone, career, password } = req.body;
    let std = {
        code: req.body.code,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        career: req.body.career
    };
    studentDto.create(std, (err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        const r = config.get("roles").student;
        let user = {
            name: std.name,
            lastname: std.lastname,
            username: std.code,
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
            notification.sendSMS(std.phone);
            res.status(201).json(
                {
                    info: data
                }
            );
        });
    });
};

exports.UpdateStudent = (req, res, next) => {
    let std = {
        code: req.body.code,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        career: req.body.career
    };
    studentDto.update({ _id: req.body.id }, std, (err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        res.status(201).json(
            {
                info: data
            }
        );
    });
};

exports.getAll = (req, res, next) => {
    studentDto.getAll({}, (err, data) => {
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

exports.getByCode = (req, res, next) => {
    studentDto.getByCode({ code: req.params.code }, (err, data) => {
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


exports.deleteStudent = () => {
    studentDto.delete({ _id: req.body.id }, (err, data) => {
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

