export interface IAction<D = {}, M = {}> { type: string; data?: D; meta?: M; }
