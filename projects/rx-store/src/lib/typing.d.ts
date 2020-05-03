export declare type Action = { type: string, payload?: any };
export declare type State = { [key: string]: any };
export declare type Reducers = { [key: string]: <T extends State>(state: T, action: Action) =>  T};

