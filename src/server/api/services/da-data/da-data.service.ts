import { env } from "~/env";
import axios from "axios";
import type { TSuggestCompanyInput } from "../../dto/company/company.dto";
import {
  SuggestCompanyResponseSchema,
  type SuggestCompanyResponse,
} from "../../types/da-data.type";
const token = env.DA_DATA_TOKEN as string;

const link = env.DA_DATA_LINK as string;

export const daDataService = {
  init() {
    const apiDaData = axios.create({
      baseURL: link ?? "",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return apiDaData;
  },

  async suggestSearch(
    dto: TSuggestCompanyInput,
  ): Promise<SuggestCompanyResponse> {
    const data = await this.init().post(
      "suggestions/api/4_1/rs/suggest/party",
      {
        query: dto.query,
      },
    );
    return SuggestCompanyResponseSchema.parse(data.data);
  },
};
