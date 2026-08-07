import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    public patterns: Record<string, RegExp> = {
        number: /^[0-9]*$/,
        alpha: /^[A-Za-z ]*$/,
        text: /^[A-Za-z ]*$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        alphanumeric: /^[A-Za-z0-9_]+$/,
    };


    public inputValidationCheck(event: any, type: any, maxValue?: number): boolean {
        const pattern = this.patterns[type];
        const value = event.target.value;

        if (!pattern.test(value)) {
            const allowedChars = pattern.source.replace(/[\^\$\[\]\*]/g, '');
            event.target.value = value.replace(new RegExp(`[^${allowedChars}]`, 'g'), '');
            event.preventDefault();
            return false;
        }

        // Max value check
        if (type === 'number' && maxValue !== undefined && Number(value) > maxValue) {
            event.target.value = maxValue;
            return false;
        }

        return true;
    }
    
}
