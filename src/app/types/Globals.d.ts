declare module "*.module.css";
declare module "*.module.scss";
// and so on for whatever flavor of css you're using
declare module '*.png';
declare module '*.jpg';
declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}
declare module '*.svg?url' {
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}