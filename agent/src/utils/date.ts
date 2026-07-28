export function getTodaysDate() {
    return new Date().toLocaleString("sv-SE", {
        timeZone: "Asia/Kolkata",
    });
}