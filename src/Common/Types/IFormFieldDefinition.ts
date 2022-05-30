export interface IFormFieldDefinition<TValue extends string | number | Date> {
    name: string;
    displayName: string;
    value: TValue;
    helperText?: string;
}