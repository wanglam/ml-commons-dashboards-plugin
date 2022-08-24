import { MODEL_API_ENDPOINT } from '../../server/routes/constants';
import { Pagination } from '../../server/services/utils/pagination';
import { HttpProvider } from './http_provider';

export interface ModelSearchItem {
  id: string;
  name: string;
  algorithm: string;
}

export interface ModelSarchResponse {
  data: ModelSearchItem[];
  pangination: Pagination;
}

export class ModelService {
  public search(query: { algorithm?: string; currentPage: number; pageSize: number }) {
    return HttpProvider.getHttp().get<{
      data: { id: string; name: string; algorithm: string }[];
      pagination: {
        currentPage: number;
        pageSize: number;
        totalRecords: number;
        totalPages: number;
      };
    }>(MODEL_API_ENDPOINT, {
      query,
    });
  }

  public delete(modelId: string) {
    return HttpProvider.getHttp().delete(`${MODEL_API_ENDPOINT}/${modelId}`);
  }
}
