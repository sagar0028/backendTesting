const db = require("../connections/db");
const { user_subscription, user, subscription_plans, payment_detail } = db;
const { nodeMailer } = require("../utils/helper/mailer");
class CronsController {
  constructor() {
    this.route = Router();
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.route.post("/cron", this.getSubscribersToNotify);
  }

  cronJob = async () => {
    const _argv = process.argv.slice(2);
    console.log("argv -> ", _argv);
    const _arg = _argv[0].toLocaleLowerCase();
    switch (_arg) {
      case "get-Subscribers-To-Notify":
        await getSubscribersToNotify();
        break;
    }
  };
  async getSubscribersToNotify(payment_timestamp_offset, page, page_size) {
    const currentDate = new Date();
    const paymentDueDate = new Date(
      currentDate.getTime() + payment_timestamp_offset
    );

    const subscribers = await user_subscription.findAndCountAll({
      where: {
        payment_due_date: {
          [Sequelize.Op.lte]: paymentDueDate, // Users with payment due before or at paymentDueDate
        },
      },
      include: [user, subscription_plans],
      limit: page_size,
      offset: (page - 1) * page_size,
    });
    for (let i = 0; i < subscribers.length; i++) {
      const {
        user: { user_id, email },
        subscription_plans: {
          subscription_plan,
          price,
          duration,
          payment_time,
        },
      } = subscribers[i];
      const users = await db.user.findAll({ where: { id: user_id } });
      if (users) {
        for (let i = 0; i < users.length; i++) {
          let { email, mobile, name } = users[i];
          paymentDueDate.setHours(0, 0, 0, 0);

          let data = await fs.readFile(
            "./email_templates/subscription-plan.html"
          );
          let rendered = data
            .toString()
            .replace(/{Email}/g, `${email}`)
            .replace(/{userName}/g, `${name}`)
            .replace(/{phoneNumber}/g, `${mobile}`)
            .replace(/{Plan}/g, `${subscription_plan}`)
            .replace(/{Due Date}/g, `${duration}`);
          let subject = "Notificatoin for Subscription Plan ";
          let sentEmail = await nodeMailer.nodeMailer({
            toEmail: email,
            subject,
            rendered,
          });
        }
      }
      console.log("Subscription Plan Remainder cron completed");
      process.exit();
    }
  }
}

module.exports = new CronsController();
