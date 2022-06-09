/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// // for native html elements
// declare module '@vue/runtime-dom' {
//   interface HTMLAttributes {
//     [key: string]: any
//   }
// }

// // for svg elements
// declare module '@vue/runtime-dom' {
//   interface SVGAttributes {
//     [key: string]: any
//   }
// }

// // for vue components
// declare module '@vue/runtime-core' {
//   interface AllowedComponentProps {
//     [key: string]: any
//   }
// }

// export {}
