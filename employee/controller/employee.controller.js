const EMPLOYEE_MODEL = require("../model/employee.model");
var _employee = {};
_employee.add = async (req, res, next) => {
  try {
    const payload = req.body;
    payload.createdBy = req.user.user;
    if (payload) {
      const isexist = await EMPLOYEE_MODEL.findOne({ email: payload.email });
      if (isexist) {
        res.send({ status: 400, message: "Employee already exist" });
        return;
      } else {
        const savedData = await EMPLOYEE_MODEL.create(payload);
        if (savedData) {
          res.send({
            status: 200,
            message: "data saved successfully",
            savedData,
          });
        }
      }
    } else {
      res.send({ status: 400, message: "Failed to save data", savedData });
    }
  } catch (error) {
    console.log("error", error);
  }
};
_employee.get = async (req, res, next) => {
  try {
    let pageNo= req.query.pageNo|| 1
    // const getData = await EMPLOYEE_MODEL.find({});
    const getData = await EMPLOYEE_MODEL.aggregate([
      {
        $facet: {
          metadata: [
            { $count: "total" },
            { $addFields: { page: pageNo } },
          ],
          data: [{ $skip: (pageNo - 1) *  pageNo}, { $limit: 10 }], 
        },
      },
    ]);
    if (getData) {
      res.send({ status: 200, message: "Data found successfully", getData });
    }
  } catch (error) {
    console.log("error", error);
  }
};
_employee.delete = async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletedData = await EMPLOYEE_MODEL.findByIdAndDelete({ _id: id });
    if (deletedData) {
      res.send({ status: 200, message: "Data deleted  successfully" });
    } else {
      res.send({ status: 200, message: "Record not  found" });
    }
  } catch (error) {
    console.log("error", error);
  }
};
_employee.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const payload = req.body;

    const findData = await EMPLOYEE_MODEL.findOne({ _id: id });
    if (findData) {
      const savedData = await EMPLOYEE_MODEL.updateOne(payload);
      if (savedData) {
        res.send({
          status: 200,
          message: "Record updated successfully",
          savedData,
        });
      }
    } else {
      res.send({
        status: 200,
        message: "Record not found",
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};
module.exports = _employee;
