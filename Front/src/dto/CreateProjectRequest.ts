import {ProjectRequest} from "./ProjectRequest";
import {CompanyRequest} from "./CompanyRequest";

export interface CreateProjectRequest {
    project: ProjectRequest;
    company: CompanyRequest | null
}