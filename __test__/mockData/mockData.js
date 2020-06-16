const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
        monthlyRent: 5000,
        currency: "sgd"
      }
    ],
    landlord: {
      name: "Jesstern",
      accountNumber: "123ACF802"
    },
    country: "Singapore",
    remarks: "ThoughtWorks office"
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
        monthlyRent: 6000,
        currency: "sgd"
      }
    ],
    landlord: {
      name: "Elson",
      accountNumber: "555ABC666"
    },
    country: "Singapore",
    remarks: "This apartment is a dump!"
  }
];

module.exports.mockApartmentInString = {
  _id: "5d303529e51a310017aa063c",
  name: "China Square Central 01-01",
  address: "18 Cross Street #01-01",
  bedrooms: 1,
  capacity: 1,
  leases: [
    {
      leaseStart: "2018-01-01T00:00:00.000Z",
      leaseEnd: "2019-01-01T00:00:00.000Z",
      monthlyRent: 5000,
      currency: "sgd"
    }
  ],
  landlord: {
    name: "Jesstern",
    accountNumber: "123ACF802"
  },
  country: "Singapore",
  remarks: "ThoughtWorks office"
};

module.exports.mockStays = [
  {
    _id: mongoose.Types.ObjectId("5d2ef34121ead80017be45df"),
    apartmentId: "5d303529e51a310017aa063c",
    occupantId: "5d2ef34111ead80017be83df",
    checkInDate: new Date("2009-10-10"),
    checkOutDate: new Date("2010-10-10"),
    leaseId: "5d401557d855f9677f345692",
    apartment: {
      name: "Parc Sophia",
      leases: [
        {
          _id: "5d401557d855f9677f345692",
          leaseStart: "2008-10-25T00:00:00.000Z",
          leaseEnd: "2004-12-25T00:00:00.000Z",
          monthlyRent: "6000"
        },
        {
          _id: "5d40fb0fe45a8c76d1061ebd",
          leaseStart: "2009-11-25T00:00:00.000Z",
          leaseEnd: "2003-11-25T00:00:00.000Z",
          monthlyRent: "7000"
        }
      ]
    }
  },
  {
    _id: mongoose.Types.ObjectId("5d2ef34121ead80067be46df"),
    apartmentId: "apartment2",
    occupantId: "5d2ef34111ead80017be83df",
    checkInDate: new Date("2013-11-11"),
    checkOutDate: new Date("2014-12-12"),
    leaseId: "e83724nht8"
  },
  {
    apartmentId: "12345",
    occupantId: "5d2ef34111ead80017be5432",
    checkInDate: new Date("2016-11-16"),
    checkOutDate: new Date("2017-12-17"),
    leaseId: "e83724nht8"
  },
  {
    apartmentId: "12345",
    occupantId: "5d2ef34111ead80017be1234",
    checkInDate: new Date("2014-11-14"),
    checkOutDate: new Date("2015-12-15"),
    leaseId: "e83724nht8"
  }
];

module.exports.mockOccupants = [
  {
    _id: mongoose.Types.ObjectId("5d2ef34111ead80017be83df"),
    name: "Tom",
    employeeId: "1234567a",
    gender: "male",
    remarks: "might extend stay",
    homeOffice: "Bangkok, Thailand",
    status: "unallocated"
  },
  {
    _id: mongoose.Types.ObjectId("5d2ef34111ead80017be5432"),
    name: "Tim",
    employeeId: "1234567b",
    remarks: "Has a pet cat",
    status: "unallocated"
  },
  {
    _id: mongoose.Types.ObjectId("5d2ef34111ead80017be1234"),
    name: "John"
  }
];

module.exports.mockOccupantInString = {
  _id: "5d2ef34111ead80017be83df",
  name: "Tom",
  employeeId: "1234567a",
  gender: "male",
  remarks: "might extend stay",
  homeOffice: "Bangkok, Thailand",
  status: "unallocated"
};

const hashPassword = password => {
  const rounds = 10;
  const hashedPassword = bcrypt.hashSync(password, rounds);
  return hashedPassword;
};

module.exports.mockUsers = [
  {
    _id: mongoose.Types.ObjectId("5dc26ecc4c33e04dc232c256"),
    email: "elson@thoughtworks.com",
    password: hashPassword("pass1234"),
    role: "admin"
  },
  {
    _id: mongoose.Types.ObjectId("5dc26ecc4c33e04dc232c845"),
    email: "mabel@thoughtworks.com",
    password: hashPassword("pass1234"),
    role: "manager"
  }
];

module.exports.mockOccupantWithoutName = [
  {
    _id: mongoose.Types.ObjectId("5d2ef34111ead80017be83df"),
    employeeId: "1234567a",
    gender: "male",
    remarks: "might extend stay",
    homeOffice: "Bangkok, Thailand",
    status: "unallocated"
  }
];
