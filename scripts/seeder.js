const seeder = require("mongoose-seed");

const seedData = DB_URL => {
  return new Promise(resolve => {
    seeder.connect(DB_URL, () => {
      seeder.loadModels([
        "./src/models/User.model.js",
        "./src/models/Apartment.model.js",
        "./src/models/Occupant.model.js",
        "./src/models/Stay.model.js"
      ]);
      seeder.clearModels(["User", "Apartment", "Occupant", "Stay"], () => {
        seeder.populateModels(
          [userSeedData, apartmentSeedData, occupantSeedData, staysSeedData],
          () => {
            seeder.disconnect();
            resolve();
          }
        );
      });
    });
  });
};

const userSeedData = {
  model: "User",
  documents: [
    {
      email: "baqa@thoughtworks.com",
      password: "testPassword1",
      role: "admin"
    }
  ]
};

const apartmentSeedData = {
  model: "Apartment",
  documents: [
    {
      status: "inactive",
      name: "The Beacon",
      address: "Fake street 11",
      bedrooms: 10,
      capacity: 10,
      leases: [
        {
          leaseStart: "2020-11-12T00:00:00.000Z",
          leaseEnd: "2020-12-12T00:00:00.000Z",
          monthlyRent: 8000,
          currency: "THB"
        }
      ],
      landlord: {
        name: "Tony Stark",
        accountNumber: "12345"
      },
      country: "Thailand",
      remarks: "Awesome"
    },
    {
      _id: "5d303529e51a310017aa1234",
      status: "active",
      name: "Connelly and Sons",
      address: "431 Scarlett Pine",
      bedrooms: 1,
      capacity: 1,
      leases: [
        {
          leaseStart: "2019-07-01T00:00:00.000Z",
          leaseEnd: "2020-07-10T00:00:00.000Z",
          monthlyRent: 1000,
          currency: "THB"
        }
      ],
      landlord: {
        name: "Cornell",
        accountNumber: "01598651"
      },
      country: "Thailand",
      remarks: "testing!!!",
      stays: ["5d2ef34121ead80067be46df"]
    },
    {
      _id: "5d303529e51a310017aa063c",
      status: "active",
      name: "Parc Sophia",
      address: "123 Parc Lane",
      bedrooms: 1,
      capacity: 1,
      leases: [
        {
          leaseStart: "2018-07-01T00:00:00.000Z",
          leaseEnd: "2021-07-10T00:00:00.000Z",
          monthlyRent: 1000,
          currency: "SGD"
        }
      ],
      landlord: {
        name: "Cornell",
        accountNumber: "01598651"
      },
      country: "Singapore",
      remarks: "testing!!!",
      stays: ["5d2ef34121ead80017be45df"]
    }
  ]
};

const occupantSeedData = {
  model: "Occupant",
  documents: [
    {
      _id: "5d2ef34111ead80017be83df",
      status: "allocated",
      name: "Catharine",
      employeeId: "773ff825-54b3-42e6-a260-4ab5bb8538d6",
      gender: "female",
      remarks: "BAD REMARKS",
      homeOffice: "Australia, Melbourne"
    },
    {
      _id: "5d2ef34111ead80017be84df",
      status: "unallocated",
      name: "Brant",
      employeeId: "10e1f6db-1698-40f9-a85d-80878b41d07d",
      gender: "male",
      remarks: "testing",
      homeOffice: "Singapore, Singapore"
    },
    {
      _id: "5d2ef34111ead80017be85df",
      status: "inactive",
      name: "Bob",
      employeeId: "",
      gender: "",
      remarks: "",
      homeOffice: ""
    }
  ]
};

const staysSeedData = {
  model: "Stay",
  documents: [
    {
      _id: "5d2ef34121ead80017be45df",
      apartmentId: "5d303529e51a310017aa063c",
      occupantId: "5d2ef34111ead80017be83df",
      checkInDate: "2020-05-01T00:00:00.000Z",
      checkOutDate: "2020-06-01T00:00:00.000Z",
      leaseId: "5d401557d855f9677f345692",
      apartment: "5d303529e51a310017aa063c"
    },
    {
      _id: "5d2ef34121ead80067be46df",
      apartmentId: "5d303529e51a310017aa1234",
      occupantId: "5d2ef34111ead80017be83df",
      checkInDate: "2020-05-01T00:00:00.000Z",
      checkOutDate: "2020-07-01T00:00:00.000Z",
      leaseId: "e83724nht8",
      apartment: "5d303529e51a310017aa1234"
    }
  ]
};

module.exports = { seedData };
