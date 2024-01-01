// Sample historical events
const historicalEvents = [
    {
        date: "1776-07-04",
        event: "Declaration of Independence",
    },
    {
        date: "1969-07-20",
        event: "Apollo 11 Moon Landing",
    },
    {
        date: "1863-11-19",
        event: "Gettysburg Address",
    },
    {
        date: "1945-08-15",
        event: "End of World War II",
    },
];
module.exports.getHistoricalEvents = (inputDateTime, maxLength) => {
    // Validate maxLength
    if (maxLength && (typeof maxLength !== "number" || maxLength <= 0)) {
        throw new Error("Invalid maxLength value");
    }
    // Basic input validation
    if (!inputDateTime || isNaN(new Date(inputDateTime))) {
        throw new Error("Invalid date and time format");
    }
    const inputDate = new Date(inputDateTime);
    // Data retrieval with maxLength limit using a for loop
    const matchingEvents = [];
    for (const event of historicalEvents) {
        const eventDate = new Date(event.date);
        if (eventDate <= inputDate) {
            matchingEvents.push(event.event);
            if (maxLength !== undefined && matchingEvents.length >= maxLength) {
                break; // Stop iterating when maxLength is reached
            }
        }
    }
    if (matchingEvents.length === 0) {
        throw new Error(
            "No historical events found for the specified date and time"
        );
    }
    // Return historical events
    return matchingEvents;
};