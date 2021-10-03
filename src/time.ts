
export module Time {
    export function untilExpiry(expiry: Date) : number{
        return (expiry.getTime() - (new Date()).getTime())/(365*1000*60*60*24)
    }
}