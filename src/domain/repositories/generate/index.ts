import Quests from "../../../data/mongodb/model/quest";
import ReportModel from "../../../data/mongodb/model/report";
import { GenerateRepository } from "../../interfaces/repositories/generate";

class GenerateRepositoryImpl implements GenerateRepository {
  async createOneReport(report: any): Promise<any> {
    const result = await new ReportModel(report).save();
    return result;
  }
}
export default GenerateRepositoryImpl;
