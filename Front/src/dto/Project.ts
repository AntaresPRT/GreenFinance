import {Author} from "./Author";

export interface Project {
    id: number,
    title: string,
    description: string,
    author: Author,
    createdAt: string,
    goalAmount: number,
    collectedAmount: number,
    deadline: string,
    esgFactors: string
}