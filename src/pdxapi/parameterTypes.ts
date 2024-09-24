export enum PARAMETER_TYPE {
    AAAAA, // included because vscode linter is broken and treating the first enum value like it's not a part of the enum when linting
    STRING_QUOTES,
    STRING_NOQUOTES,
    DATE,
    NUMBER,
    ARRAY_NUMBER,
    ARRAY_STRING_NOQUOTES,
    ARRAY_STRING_QUOTES,
    COMPARISON, //a number comparison eg "> 5" or "< 3"
    MAP, //has properties with values
    BOOLEAN,
    NAME, //eg names in character files where it can be quoted string or not quoted string
    OBJECT,
}

export interface NamedParameter {
    name: string,
    type: PARAMETER_TYPE,
    required: boolean,
}