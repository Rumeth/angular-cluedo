import { Pipe , PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe ( {
            name : 'sanitize'
        } )

export class SanitizerPipe implements PipeTransform
{
    constructor ( private domSanitizer : DomSanitizer )
    {
    }

    transform ( html )
    {
        return this.domSanitizer.bypassSecurityTrustUrl ( html );
    }
}
