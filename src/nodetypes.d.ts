import fs from 'fs';

 declare global {
   interface Window {
     require(moduleSpecifier: 'fs'): typeof fs;
   }
 }