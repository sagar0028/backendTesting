// subscriptionPlans Table

const subscriptionPlans = [
  {
    id: 1,
    name: "Basic Plan",
    price: 5,
    duration: "daily",
  },
  {
    id: 2,
    name: "Premium Plan",
    price: 20,
    duration: "yearly",
  },
  {
    id: 3,
    name: "Gold Plan",
    price: 15,
    duration: "monthly",
  },
  {
    id: 4,
    name: "Silver Plan",
    price: 10,
    duration: "weekly",
  },
];

// userSubscriptions Maping Table

const userSubscriptions = [
  {
    userId: 1,
    planId: 1,
    is_subscribed: true,
  },
  {
    userId: 2,
    planId: 1,
    is_subscribed: true,
  },
  {
    userId: 3,
    planId: 4,
    is_subscribed: false,
  },
  {
    userId: 4,
    planId: 1,
    is_subscribed: true,
  },
  {
    userId: 5,
    planId: 1,
    is_subscribed: true,
  },
];

// User Table Data
const userData = [
  {
    id: 1, // primary_key
    name: "Tushar",
    mobile_no: 9991018900,
    is_user: true,
  },
  {
    id: 2,
    name: "Sumit",
    mobile_no: 9991018900,
    is_user: true,
  },
  {
    id: 2,
    name: "Premium Plan",
    mobile_no: 9991018900,
    is_user: true,
  },
  {
    id: 2,
    name: "Abhay Kumar",
    mobile_no: 9991018900,
    is_user: true,
  },
];


module.exports={
  subscriptionPlans,
  userData,
  userSubscriptions
}