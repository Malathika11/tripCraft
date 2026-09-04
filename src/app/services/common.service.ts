import { Injectable } from '@angular/core';
import { TripStateService } from './trip-state.service';

@Injectable({
    providedIn: 'root',
})
export class CommonService {

    constructor(public tripState: TripStateService){}

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

    public tripDetails: any = {};

    totalBudget = 300000;

    costBreakdown: any;

    days: any;

    public formatDate(dateStr: string, withWeekday = false): string {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return withWeekday
            ? d.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' })
            : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    }

    public cityName(full: string): string {
        return full ? full.split(',')[0].trim() : '';
    }

    // ---------- main loader ----------
    public loadFromSession() {
        const requestFormValue = this.tripState.get<any>('requestFormValue');
        const packageCardDetails = this.tripState.get<any>('packageCardDetails');
        const flightDeails = this.tripState.get<any>('flightDeails');
        const transportDetails = this.tripState.get<any>('transportDetails');
        const hotelValue = this.tripState.get<any[]>('hotelValue') || [];
        const visitPlace = this.tripState.get<any>('visitPlace') || {};

        this.buildTripDetails(requestFormValue);
        this.buildTotalBudget(packageCardDetails);
        this.buildCostBreakdown(requestFormValue, flightDeails, transportDetails, hotelValue, visitPlace);
        this.buildDays(requestFormValue, flightDeails, transportDetails, hotelValue, visitPlace);
    }

    // ---------- tripDetails ----------
    public buildTripDetails(requestFormValue: any): void {
        if (!requestFormValue) return;
        this.tripDetails = {
            from: this.cityName(requestFormValue.fromCity),
            to: this.cityName(requestFormValue.toCity),
            startDate: this.formatDate(requestFormValue.startDate),
            endDate: this.formatDate(requestFormValue.endDate),
            travelers: (requestFormValue.adults || 0) + (requestFormValue.children || 0) + (requestFormValue.infants || 0)
        };
        console.log(this.tripDetails);

    }

    // ---------- totalBudget ----------
    public buildTotalBudget(packageCardDetails: any): void {
        this.totalBudget = packageCardDetails ? (parseFloat(packageCardDetails.price) || 0) : 0;
    }

    // ---------- shared amount calculators ----------
    public getVisitingPlacesTotal(visitPlace: any): number {
        return Object.values(visitPlace || {})
            .flat()
            .filter((p: any) => !p.restFlag)
            .reduce((sum: number, p: any) => sum + (p.price || 0), 0);
    }

    public getHotelTotal(hotelValue: any[]): number {
        return (hotelValue || []).reduce((sum, h) => sum + (h.totalPrice || 0), 0);
    }

    // ---------- costBreakdown ----------
    public buildCostBreakdown(requestFormValue: any, flightDeails: any, transportDetails: any, hotelValue: any[], visitPlace: any): void {
        console.log(requestFormValue, flightDeails, transportDetails,hotelValue);
        
        const flightAmount = (flightDeails?.oneWay?.amount || 0) + (flightDeails?.roundTrip?.amount || 0);
        const transportAmount = transportDetails?.totalCost || 0;
        const hotelAmount = this.getHotelTotal(hotelValue);
        const visitingAmount = this.getVisitingPlacesTotal(visitPlace);
        const pct = (amt: number, splitAmount: number) => splitAmount > 0 ? Math.round((amt / splitAmount) * 100) : 0;
        
        const fromCity = this.cityName(requestFormValue?.fromCity);
        const toCity = this.cityName(requestFormValue?.toCity);
        const totalDays = requestFormValue?.totalDays || 0;
        const plannedDays = Object.keys(visitPlace || {}).length;

        this.costBreakdown = [
            {
                type: 'Flight', icon: 'cls-61-flight', amount: flightAmount, percentage: pct(flightAmount, requestFormValue.breakdownForm.amountflight),
                description: `${fromCity} ↔ ${toCity}`, status: 'Edit allocation', className: 'flight'
            },
            {
                type: 'Transport', icon: 'cls-52-bus', amount: transportAmount, percentage: pct(transportAmount, requestFormValue.breakdownForm.amountguide),
                description: `${transportDetails?.tripDays ?? 0} days · full-trip package`, status: 'Edit allocation', className: 'transport'
            },
            {
                type: 'Hotel', icon: 'cls-51-hotel', amount: hotelAmount, percentage: pct(hotelAmount, requestFormValue.breakdownForm.amounthotel),
                description: hotelAmount > 0 ? `${hotelValue.length} stay${hotelValue.length > 1 ? 's' : ''} booked` : 'Not selected yet',
                status: 'Edit allocation', className: 'hotel'
            },
            {
                type: 'Visiting places', icon: 'cls-58-location', amount: visitingAmount, percentage: pct(visitingAmount, requestFormValue.breakdownForm.amountvisitingPlaces),
                description: `${plannedDays} of ${totalDays} days planned`, status: 'Edit allocation', className: 'visiting'
            }
        ];
        console.log(this.costBreakdown);
        
    }

    // ---------- days ----------
    public buildDays(requestFormValue: any, flightDeails: any, transportDetails: any, hotelValue: any[], visitPlace: any): void {
        const totalDays = requestFormValue?.totalDays || 0;
        const start = requestFormValue?.startDate ? new Date(requestFormValue.startDate) : null;

        this.days = Array.from({ length: totalDays }, (_, i) => {
            const dayNumber = i + 1;
            const dateObj = start ? new Date(start) : null;
            if (dateObj) dateObj.setDate(dateObj.getDate() + i);

            const dayPlaces = (visitPlace?.[dayNumber] || []) as any[];
            const isRestDay = dayPlaces.some(p => p.restFlag);
            const realPlaces = dayPlaces.filter(p => !p.restFlag);

            const activities: any[] = [];

            // i) flight — arrival on day 1, return on last day
            if (dayNumber === 1 && flightDeails?.oneWay) {
                const f = flightDeails.oneWay;
                activities.push({
                    icon: 'cls-61-flight', title: `Depart ${f.departureSector} → ${f.arrivelSector}`,
                    description: `${f.subName} · ${f.departureTime} · ${f.stopType} · ${f.stopCount}`,
                    amount: f.amount, className: 'flight'
                });
            }
            if (dayNumber === totalDays && flightDeails?.roundTrip) {
                const f = flightDeails.roundTrip;
                activities.push({
                    icon: 'cls-61-flight', title: `Return ${f.departureSector} → ${f.arrivelSector}`,
                    description: `${f.subName} · ${f.departureTime} · ${f.stopType} · ${f.stopCount}`,
                    amount: f.amount, className: 'flight'
                });
            }
            console.log('flight', dayNumber,activities);
            
            // ii) transport / guide pickup — shown once, on the pickup day (defaults to day 1)
            const transportPickupDay = transportDetails?.pickupDay || 1;
            if (transportDetails && dayNumber === transportPickupDay) {
                activities.push({
                    icon: 'cls-52-bus',
                    title: transportDetails.guideName ? `Guide pickup — ${transportDetails.guideName}` : 'Transport / Taxi package pickup',
                    description: `${transportDetails.vehicleType || 'Private vehicle'} · ${transportDetails.tripDays ?? totalDays} days package`,
                    amount: transportDetails.totalCost || 0, className: 'transport'
                });
            }

            console.log('transport', dayNumber,activities);

            // iii) hotel — only on the actual check-in day, not every night of the stay
            const hotelForDay = (hotelValue || []).find(h => dayNumber === h.days?.start);
            if (hotelForDay) {
                activities.push({
                    icon: 'cls-51-hotel', title: `Check-in — ${hotelForDay.hotelName}`, description: hotelForDay.roomName,
                    amount: parseFloat(hotelForDay.pricePerNight) || 0, className: 'hotel'
                });
            }

            console.log('hotel', dayNumber,activities);

            // iv) attractions for this day
            realPlaces.forEach((place: any) => {
                activities.push({
                    icon: 'cls-58-location', title: place.name, description: `${place.duration} · ${place.location}`,
                    oldAmount: place.oldPrice ?? undefined, amount: place.price, className: 'visit'
                });
            });

            console.log('place', dayNumber,activities);

            return {
                day: dayNumber,
                date: dateObj ? this.formatDate(dateObj.toISOString(), true) : '',
                title: isRestDay ? 'Rest Day' : (activities.length > 0 ? this.dayTitleFallback(dayNumber, totalDays) : 'Not planned yet'),
                activitiesCount: realPlaces.length,
                expanded: dayNumber === 1,
                isRestDay,
                activities: activities  
            };  
        });
    }

    // editorial titles can't come from session data — simple fallback, override manually if you want
    public dayTitleFallback(dayNumber: number, totalDays: number): string {
        if (dayNumber === 1) return 'Arrival';
        if (dayNumber === totalDays) return 'Departure';
        return 'Day plan';
    }

    get plannedCost(): number {

        return this.costBreakdown.reduce(
            (total: any, item: any) => total + item.amount,
            0
        );

    }

}
