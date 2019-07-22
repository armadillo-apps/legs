const mongoose = require("mongoose");

module.exports.mockApartments = [
  {
    _id: mongoose.Types.ObjectId("5d303529e51a310017aa063c"),
    name: "China Square Central 01-01",
    address: "18 Cross Street #01-01",
    bedrooms: 1,
    capacity: 1,
    leases: [
      {
        leaseStart: new Date("2018-01-01"),
        leaseEnd: new Date("2019-01-01"),
        monthlyRent: 5000
      }
    ],
    landlord: {
      name: "Jesstern",
      accountNumber: "123ACF802",
      mobile: 90001000,
      email: "jess@thoughtworks.com"
    }
  },
  {
    name: "Parc Sophia Unit 05-10",
    address: "10 Adis Road #05-10",
    bedrooms: 2,
    capacity: 2,
    leases: [
      {
        leaseStart: new Date("2017-10-01"),
        leaseEnd: new Date("2018-10-01"),
        monthlyRent: 6000
      }
    ],
    landlord: {
      name: "Elson",
      accountNumber: "555ABC666",
      mobile: 91112222,
      email: "elson@thoughtworks.com"
    }
  }
];

module.exports.mockStays = [
  {
    apartmentId: "5d303529e51a310017aa063c",
    occupantId: "5d2ef34111ead80017be83df",
    checkInDate: 10 / 10 / 2009,
    checkOutDate: 10 / 10 / 2010,
    leaseId: "e83724nht8"
  },
  {
    apartmentId: "apartment2",
    occupantId: "5d2ef34111ead80017be83df",
    checkInDate: 11 / 11 / 2011,
    checkOutDate: 12 / 12 / 2012,
    leaseId: "e83724nht8"
  }
];

module.exports.mockOccupants = [
  {
    _id: mongoose.Types.ObjectId("5d2ef34111ead80017be83df"),
    name: "Tom",
    employeeId: "1234567a",
    remarks: "might extend stay"
  },
  {
    name: "Tim",
    employeeId: "1234567b"
  }
];
