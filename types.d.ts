declare namespace NominateMeme {
    export interface MemberData<F extends readonly string[] = string[]> {
        title: string
        desc?: string
        items?: string[]
        filter?: F
        data: MemberDataItem<F>[]
    }

    export interface MemberDataItem<F extends readonly string[] = string[]> {
        id: string | number
        name: string
        avatar: string
        filter?: F extends readonly (infer U)[] ? U : never
    }
}
