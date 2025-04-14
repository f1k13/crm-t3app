import { env } from "~/env";
import axios from "axios";
import type { TSuggestCompanyInput } from "../../dto/company/company.dto";
import {
  SuggestCompanyResponseSchema,
  type SuggestCompanyResponse,
} from "../../types/da-data.type";
const token = env.DA_DATA_TOKEN;

const link = env.DA_DATA_LINK;

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
    const isINN = this.isINN(dto.query);
    console.log(isINN);
    const endpoint = isINN
      ? "suggestions/api/4_1/rs/findById/party"
      : "suggestions/api/4_1/rs/suggest/party";

    const requestBody = isINN
      ? { query: dto.query.trim() }
      : {
          query: dto.query,
          count: 20,
        };
    const data = await this.init().post(endpoint, requestBody);
    console.log(data.data, "DATA");
    return SuggestCompanyResponseSchema.parse(data.data);
  },
  isINN(query: string): boolean {
    const trimmed = query.trim();

    if (/^\d{10}$/.test(trimmed) || /^\d{12}$/.test(trimmed)) {
      return true;
    }

    if (/^\d+$/.test(trimmed) && trimmed.length >= 10) {
      return true;
    }

    if (
      /^[\d\s-]+$/.test(trimmed) &&
      trimmed.replace(/[^\d]/g, "").length >= 10
    ) {
      return true;
    }

    return false;
  },
};
