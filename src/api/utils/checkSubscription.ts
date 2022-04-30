import axios, { AxiosError } from "axios";

import { hotmart } from "../services/hotmart";

interface ISubscriptionsItems {
  subscriber_code: string;
  product: {
    name: string;
  };
  subscriber: {
    name: string;
  };
  plan: {
    name: string;
  };
  status: string;
}

interface ICheckSubscriptionData {
  items: ISubscriptionsItems[];
}

interface IGetTokenData {
  access_token: string;
}

interface ICheckSubscriptionReturn {
  data: ISubscriptionsItems | null;
  newToken?: string;
}

const getSubscription = async (
  hotmartToken: string,
  subscriberCode: string,
) => {
  const { data } = await hotmart.get<ICheckSubscriptionData>(
    `${process.env.HOTMART_API_BASEURL}/payments/api/v1/subscriptions`,
    {
      headers: { Authorization: `Bearer ${hotmartToken}` },
      params: { subscriber_code: subscriberCode },
    },
  );
  return data;
};

export const checkSubscription = async (
  hotmartToken: string,
  subscriberCode: string,
): Promise<ICheckSubscriptionReturn> => {
  try {
    const data = await getSubscription(hotmartToken, subscriberCode);
    return {
      data: data.items[0],
    };
  } catch (error: AxiosError | unknown) {
    console.log(error);
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const { data } = await axios.post<IGetTokenData>(
        "https://api-sec-vlc.hotmart.com/security/oauth/token",
        {
          params: {
            grant_type: "client_credentials",
            client_id: process.env.HOTMART_CLIENT_ID,
            client_secret: process.env.HOTMART_CLIENT_SECRET,
          },
          headers: { Authorization: process.env.HOTMART_BASIC },
        },
      );

      const newToken = data.access_token;

      const subscriptionData = await getSubscription(newToken, subscriberCode);

      if (!subscriptionData.items) return { data: null };

      return {
        data: subscriptionData.items[0],
        newToken,
      };
    }
    return { data: null };
  }
};
