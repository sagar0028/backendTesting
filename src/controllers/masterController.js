const data = require("../utils/database/subscription");
const { Router } = require("express");
const fs = require("fs");
const filePath = "./userSubscriptions.json";
const { checkToken, generateToken } = require("../middlewares/auth");





class MasterController {
  constructor() {
    this.route = Router();
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.route.post("/", checkToken, this.addSubscriptionPlan);
    this.route.get("/:plan_id", checkToken, this.getSubscriptionPlanById);
    this.route.post("/:plan_id/subscribe", checkToken, this.subscribeUser);
    this.route.post("/:plan_id/unsubscribe", checkToken, this.unsubscribeUser);
    this.route.get(
      "/:plan_id/subscribers",
      checkToken,
      this.getPaginatedSubscribers
    );
  }


  addSubscriptionPlan = async (req, res, next) => {
    try {
      console.log("<<<<<<<<<Add_Subscription_Plan_Start");
      const { id: id, name, price, duration } = req.body;

      const getPlansData = data.subscriptionPlans;
      const existingPlan = getPlansData.find((plan) => plan.id === id);
      if (existingPlan) {
        res.status(400).json({ message: "Subscription Plan already exists." });
      } else {
        // Create a new plan object
        const newPlan = {
          id,
          name,
          price,
          duration,
        };
        data.subscriptionPlans.push(newPlan);
        console.log("subscription plan creation successfully:", newPlan);
        res
          .status(200)
          .json({ message: "New plan added successfully", plan: newPlan });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getSubscriptionPlanById = async (req, res, next) => {
    try {
      console.log("<<<<<<<<<<<<<<<<<Get_Subscription_Plan_By_Id_Start");
      const { plan_id } = req.params;
      const getPlansData = data.subscriptionPlans;

      for (let i = 0; i < getPlansData.length; i++) {
        const { id } = getPlansData[i];
        if (id === parseInt(plan_id)) {
          res
            .status(200)
            .send({ status: true, result, message: "Data Found" });
        } else {
          res
            .status(404)
            .send({ status: false, result, message: "Data not Found" });
        }
      }
      console.log("<<<<<<<<<<<<<<<<<Get_Subscription_Plan_By_Id_End");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  subscribeUser = async (req, res, next) => {
    try {
      console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<Subscribe_User_Start");
      let result;
      const { plan_id } = req.params;
      const { id: _id, name, mobile_no: _mobile_no } = req.body;

      //   check user details in db.
      const { userData, subscriptionPlans, userSubscriptions } = await data;
      const plan = subscriptionPlans.find(
        (plan) => plan.id === parseInt(plan_id)
      );
      if (!plan) {
        return res.status(404).json({ message: "Plan not found" });
      }
      const existingSubscription = userSubscriptions.find(
        (subscription) =>
          subscription.userId === _id &&
          subscription.planId === parseInt(plan_id) &&
          subscription.is_subscribed === true
      );
      if (existingSubscription) {
        return res
          .status(400)
          .json({ message: "User is already subscribed to this plan" });
      } else {
        const dataInsert = await userSubscriptions.push({
          userId: _id,
          planId: plan_id,
          is_subscribed: true,
        });
        this.writeUserSubscriptions(userSubscriptions);
        res.status(200).send({ status: true, result, message: "" });
      }
      console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<Subscribe_User_End");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  unsubscribeUser = async (req, res, next) => {
    try {
      console.log("<<<<<<<<<<<<<<<<<<<<<UnsubscribeUser_Start");
      const { plan_id } = req.params;
      const { id: UserId, name, mobile_no: _mobile_no } = req.body;

      const { userSubscriptions } = await data;

      const subscriptionIndex = userSubscriptions.findIndex(
        (subscription) =>
          userSubscriptions.userId === UserId && subscription.planId === plan_id
      );
      if (subscriptionIndex === -1) {
        return res
          .status(400)
          .json({ message: "User is not subscribed to this plan" });
      } else {
        userSubscriptions.splice(subscriptionIndex, 1);

        res
          .status(200)
          .json({ message: "User unsubscribed successfully", plan });
      }
      console.log("<<<<<<<<<<<<<<<<<<<<<UnsubscribeUser_End");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  getPaginatedSubscribers = async (req, res, next) => {
    try {
      console.log("<<<<<<<<<<<<<<<<<<<<<<Get_Paginated_Subscribers_Start");
      const { userData, subscriptionPlans, userSubscriptions } = await data;
      const { plan_id } = req.params;
      const { page, page_size } = req.query;
      let planSubscribers = [];
      for (let i = 0; i < userSubscriptions.length; i++) {
        const { userId, planId, is_subscribed } = userSubscriptions[i];
        if (planId === parseInt(plan_id)) {
          planSubscribers.push({ userId, planId, is_subscribed });
        }
      }
      const startIndex = (parseInt(page) - 1) * parseInt(page_size);
      const endIndex = startIndex + parseInt(page_size);

      const paginatedSubscribers = planSubscribers.slice(startIndex, endIndex);

      res.status(200).json({
        page: parseInt(page),
        page_size: parseInt(page_size),
        subscribers: paginatedSubscribers.length,
        total_subscribers: planSubscribers,
      });
      console.log("<<<<<<<<<<<<<<<<<<<<<<Get_Paginated_Subscribers_End");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

module.exports = new MasterController();
