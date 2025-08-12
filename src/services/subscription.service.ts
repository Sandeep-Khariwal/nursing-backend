import { randomUUID } from "crypto";
import Subscription from "../models/subscription.model";

export class SubscriptionService {
  public async createSubscription(data: {
    name: string;
    examId: string;
    plans: { price: number; discountPrice: number; duration: string }[];
    planTag: string;
    includes: string[];
  }) {
    try {
      const subscription = new Subscription();
      subscription._id = `SUBS-${randomUUID()}`;
      subscription.name = data.name;
      subscription.examId = data.examId;
      subscription.plans = data.plans;
      subscription.planTag = data.planTag;
      subscription.includes = data.includes;

      const savedSubscription = await subscription.save();

      return {
        status: 200,
        subcription: savedSubscription,
        message: "Subscription created!!",
      };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  public async updateSubscriptionById(
    id: string,
    data: {
      name: string;
      examId: string;
      prizing: { originalPrize: number; oldPeize: number; duration: string }[];
      planTag: string;
      includes: string[];
    }
  ) {
    try {
      const subscription = await Subscription.findByIdAndUpdate(id, data, {
        new: true,
      });

      return {
        status: 200,
        subcription: subscription,
        message: "Subscription updated!!",
      };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  public async getSubscriptionsByExamId(id: string) {
    try {
      const subscriptions = await Subscription.find({ examId: id });

      if (subscriptions && !subscriptions.length) {
        return {
          status: 200,
          subscriptions: [],
          message: "Subscriptions not found",
        };
      }

      return { status: 200, subscriptions };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
}
