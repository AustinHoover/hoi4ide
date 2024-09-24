import { SCOPE_TYPE } from "../pdxapi/scopeDefinitions";

export interface Scope {
    name: string,
    type: SCOPE_TYPE,
    object: any,
}
