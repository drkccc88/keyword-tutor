export function formatToJapaneseTime(date: Date): string {
    const timeZoneDate = new Date(
        date.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }),
    );

    const year: number = timeZoneDate.getFullYear();
    const month: string = String(timeZoneDate.getMonth() + 1).padStart(2, '0');
    const day: string = String(timeZoneDate.getDate()).padStart(2, '0');
    const hours: string = String(timeZoneDate.getHours()).padStart(2, '0');
    const minutes: string = String(timeZoneDate.getMinutes()).padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}`;
}
