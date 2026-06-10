/** Declaración de tipos para CSS Modules (usados en los archivos *.web.tsx). */
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
