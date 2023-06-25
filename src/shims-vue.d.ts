// This resolve the problem that @typescript-eslint cannot correctly determine the type of a
// component defined with <script setup>.

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent
  export default component
}
