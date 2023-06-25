import type { AllowedComponentProps, Component, VNodeProps } from 'vue'

// Source: https://stackoverflow.com/questions/68602712/extracting-the-prop-types-of-a-component-in-vue-3-typescript-to-use-them-somew#answer-73784241
export type ComponentProps<C extends Component> = C extends new (...args: unknown[]) => unknown
  ? Omit<InstanceType<C>['$props'], keyof VNodeProps | keyof AllowedComponentProps>
  : never

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

// Sometimes @typescript-eslint can not determine type correctly, so we need to this workaound to
// transform ArrayType like this.
export type A2A<A extends readonly unknown[]> = ArrayElement<A>[]
