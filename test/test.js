// Imported Mocha dynamically
const { run } = await import("mocha");

// Defining an asynchronous function to run the tests
const runTests = async () => {
    // Imported Chai and other dependencies dynamically
    const chai = await import("chai");
    const { expect } = chai;

    // Imported the module you want to test
    const { getHistoricalEvents } = await import("./getHistoricalEvents");

    describe("getHistoricalEvents", () => {
        it("should return historical events for a valid inputDateTime", () => {
            const result = getHistoricalEvents("1900-01-01");
            expect(result).to.deep.equal([
                "Declaration of Independence",
                "Gettysburg Address",
            ]);
        });

        it("should return historical events with maxLength limitation", () => {
            const result = getHistoricalEvents("1900-01-01", 1);
            expect(result).to.deep.equal(["Declaration of Independence"]);
        });

        it("should handle dates very close to historical events", () => {
            const result = getHistoricalEvents("1776-07-03");
            expect(result).to.deep.equal(["Declaration of Independence"]);
        });

        it("should gracefully handle invalid date formats with specific error message", () => {
            expect(() => getHistoricalEvents("invalidDate")).to.throw(
                "Invalid date and time format. Please provide a valid date and time string."
            );
        });

        it("should gracefully handle invalid maxLength values with specific error message", () => {
            expect(() => getHistoricalEvents("1900-01-01", "invalidMaxLength")).to.throw(
                "Invalid maxLength value. Please provide a positive numeric value."
            );
        });

        it("should not display future events as historical", () => {
            const result = getHistoricalEvents("2200-01-01");
            expect(result).to.deep.equal([]);
        });

        it("should throw an error for a date with no historical events", () => {
            expect(() => getHistoricalEvents("1700-01-01")).to.throw(
                "No historical events found for the specified date and time"
            );
        });

        it("should handle dates exactly matching historical events", () => {
            const result = getHistoricalEvents("1776-07-04");
            expect(result).to.deep.equal([
                "Declaration of Independence",
                "Gettysburg Address",
            ]);
        });

        it("should handle dates matching multiple historical events", () => {
            const result = getHistoricalEvents("1969-07-20");
            expect(result).to.deep.equal(["Apollo 11 Moon Landing", "End of World War II"]);
        });

        it("should handle maxLength greater than the number of historical events", () => {
            const result = getHistoricalEvents("1800-01-01", 10);
            expect(result).to.deep.equal([
                "Declaration of Independence",
                "Gettysburg Address",
                "Apollo 11 Moon Landing",
                "End of World War II",
            ]);
        });

        it("should handle maxLength equal to the number of historical events", () => {
            const result = getHistoricalEvents("1800-01-01", 4);
            expect(result).to.deep.equal([
                "Declaration of Independence",
                "Gettysburg Address",
                "Apollo 11 Moon Landing",
                "End of World War II",
            ]);
        });

        it("should handle maxLength equal to zero", () => {
            const result = getHistoricalEvents("1800-01-01", 0);
            expect(result).to.deep.equal([]);
        });

        it("should handle valid date formats with different time zones", () => {
            const result1 = getHistoricalEvents("1969-07-20T00:00:00-05:00");
            const result2 = getHistoricalEvents("1969-07-20T00:00:00+05:00");
            expect(result1).to.deep.equal(["Apollo 11 Moon Landing", "End of World War II"]);
            expect(result2).to.deep.equal(["Apollo 11 Moon Landing", "End of World War II"]);
        });

        it("should handle various scenarios of valid and invalid inputs for maxLength", () => {
            expect(() => getHistoricalEvents("1900-01-01", -1)).to.throw(
                "Invalid maxLength value. Please provide a positive numeric value."
            );

            expect(() => getHistoricalEvents("1800-01-01", 4)).to.not.throw();

            expect(() => getHistoricalEvents("1800-01-01", 0)).to.not.throw();

            expect(() => getHistoricalEvents("1969-07-20T00:00:00-05:00")).to.not.throw();
        });
    });

    // This Will Run Mocha tests
    run();
};

// Immediately we will call the asynchronous function within an IIFE
(async () => {
    await runTests();
})();
