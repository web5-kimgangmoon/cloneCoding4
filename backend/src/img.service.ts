import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { extname, basename } from 'path';
import { lookup } from 'mime-types';

@Injectable()
export class Img_service {
  findImg(img_link: string) {
    const ext = extname(img_link);
    const mimetype = lookup(ext.slice(1));
    const file = readFileSync(`./imgs/${basename(img_link, ext)}`);
    return { file, mimetype };
  }
}
