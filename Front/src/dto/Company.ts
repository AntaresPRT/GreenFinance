import {Author} from "./Author";

export interface Company {
    id: number,
    name: string,
    description: string,
    tags: string,
    author: Author,
}
