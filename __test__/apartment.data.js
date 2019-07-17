module.exports = [
  {
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
