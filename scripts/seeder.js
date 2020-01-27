const seeder = require("mongoose-seed");

const seedData = DB_URL => {
  return new Promise(resolve => {
    seeder.connect(DB_URL, () => {
      seeder.loadModels([
        "./src/models/User.model.js",
        "./src/models/Apartment.model.js",
        "./src/models/Occupant.model.js"
      ]);
      seeder.clearModels(["User", "Apartment", "Occupant"], () => {
        seeder.populateModels(
          [userSeedData, apartmentSeedData, occupantSeedData],
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
      status: "Inactive",
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
      status: "Active",
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
      remarks: "testing!!!"
    },
    {
      status: "Active",
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
      remarks: "testing!!!"
    }
  ]
};

const occupantSeedData = {
  model: "Occupant",
  documents: [
    {
      status: "allocated",
      name: "Catharine",
      employeeId: "773ff825-54b3-42e6-a260-4ab5bb8538d6",
      gender: "female",
      remarks: "BAD REMARKS",
      homeOffice: "Australia, Melbourne"
    },
    {
      status: "unallocated",
      name: "Brant",
      employeeId: "10e1f6db-1698-40f9-a85d-80878b41d07d",
      gender: "male",
      remarks: "testing",
      homeOffice: "Singapore, Singapore"
    },
    {
      status: "inactive",
      name: "Bob",
      employeeId: "",
      gender: "",
      remarks: "",
      homeOffice: ""
    }
  ]
};

module.exports = { seedData };
