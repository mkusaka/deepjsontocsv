import { describe, it, expect } from "vitest";
import { jsonToCsv } from "./main";

// Test suite for jsonToCsv
describe("jsonToCsv", () => {
  it("should convert a single JSON object to CSV", () => {
    const jsonObject = {
      album: "The White Stripes",
      year: 1999,
      US_peak_chart_post: "-",
      main_actor: {
        name: "Jack White",
        birth: "1975",
      },
      actors: [
        {
          name: "Jack White",
          birth: "1975",
        },
      ],
    };

    const expectedCsv = `album,year,US_peak_chart_post,main_actor.name,main_actor.birth,actors[0].name,actors[0].birth
The White Stripes,1999,-,Jack White,1975,Jack White,1975`;

    const result = jsonToCsv(jsonObject);
    expect(result).toBe(expectedCsv);
  });

  it("should convert a single JSON object to CSV", () => {
    const jsonObject = {
      album: "The White Stripes",
      year: 1999,
      US_peak_chart_post: "-",
      main_actor: {
        name: "Jack White",
        birth: "1975",
      },
      actors: [
        {
          name: "Jack White",
          birth: "1975",
        },
      ],
    };

    const expectedCsv = `album,year,US_peak_chart_post,main_actor.name,main_actor.birth,actors[0].name,actors[0].birth
The White Stripes,1999,-,Jack White,1975,Jack White,1975`;

    const result = jsonToCsv(jsonObject);
    expect(result).toBe(expectedCsv);
  });
  it("should convert an array of JSON objects to CSV", () => {
    const jsonArray = [
      {
        album: "The White Stripes",
        year: 1999,
        US_peak_chart_post: "-",
        main_actor: {
          name: "Jack White",
          birth: "1975",
        },
        actors: [
          {
            name: "Jack White",
            birth: "1975",
          },
        ],
      },
      {
        album: "De Stijl",
        year: 2000,
        US_peak_chart_post: "-",
      },
    ];

    const expectedCsv = `album,year,US_peak_chart_post,main_actor.name,main_actor.birth,actors[0].name,actors[0].birth
The White Stripes,1999,-,Jack White,1975,Jack White,1975
De Stijl,2000,-,,,,`;

    const result = jsonToCsv(jsonArray);
    expect(result).toBe(expectedCsv);
  });

  it("should convert an array of JSON objects to CSV 2", () => {
    const jsonArray = [
      {
        album: "De Stijl",
        year: 2000,
        US_peak_chart_post: "-",
      },
      {
        album: "The White Stripes",
        year: 1999,
        US_peak_chart_post: "-",
        main_actor: {
          name: "Jack White",
          birth: "1975",
        },
        actors: [
          {
            name: "Jack White",
            birth: "1975",
          },
        ],
      },
    ];

    const expectedCsv = `album,year,US_peak_chart_post,main_actor.name,main_actor.birth,actors[0].name,actors[0].birth
De Stijl,2000,-,,,,
The White Stripes,1999,-,Jack White,1975,Jack White,1975`;

    const result = jsonToCsv(jsonArray);
    expect(result).toBe(expectedCsv);
  });

  it("should handle JSON objects with missing fields gracefully", () => {
    const jsonArray = [
      {
        album: "De Stijl",
        year: 2000,
        US_peak_chart_post: "-",
      },
    ];

    const expectedCsv = `album,year,US_peak_chart_post
De Stijl,2000,-`;

    const result = jsonToCsv(jsonArray);
    expect(result).toBe(expectedCsv);
  });
});
