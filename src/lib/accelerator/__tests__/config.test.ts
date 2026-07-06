import { describe, it, expect } from "vitest";
import {
  COHORT,
  getStatusUi,
  hasConfirmedOpenDate,
  formatCohortDate,
  type ApplicationStatus,
} from "../config";

const ALL_STATUSES: ApplicationStatus[] = [
  "COMING_SOON",
  "APPLICATIONS_OPEN",
  "APPLICATIONS_CLOSED",
  "REVIEWING",
  "INTERVIEWS",
  "COHORT_SELECTED",
  "PROGRAM_LIVE",
  "DEMO_DAY",
  "ALUMNI",
];

describe("application status engine", () => {
  it("provides UI for every status", () => {
    for (const s of ALL_STATUSES) {
      const ui = getStatusUi(s);
      expect(ui.pill.length).toBeGreaterThan(0);
      expect(ui.cta.label.length).toBeGreaterThan(0);
      expect(ui.cta.href.startsWith("/accelerator")).toBe(true);
    }
  });

  it("only APPLICATIONS_OPEN accepts submissions", () => {
    for (const s of ALL_STATUSES) {
      expect(getStatusUi(s).applicationsOpen).toBe(s === "APPLICATIONS_OPEN");
    }
  });

  it("defaults to the configured cohort status", () => {
    expect(getStatusUi()).toEqual(getStatusUi(COHORT.applicationStatus));
  });
});

describe("countdown gating — never fake a countdown", () => {
  it("reports no confirmed open date when null", () => {
    expect(hasConfirmedOpenDate({ ...COHORT, applicationOpenDate: null })).toBe(false);
  });

  it("reports confirmed open date when set", () => {
    expect(
      hasConfirmedOpenDate({ ...COHORT, applicationOpenDate: "2026-12-01" })
    ).toBe(true);
  });
});

describe("formatCohortDate", () => {
  it("returns null for null / invalid input", () => {
    expect(formatCohortDate(null)).toBeNull();
    expect(formatCohortDate("not-a-date")).toBeNull();
  });

  it("formats ISO dates for India", () => {
    expect(formatCohortDate("2026-12-01")).toMatch(/December.*2026|1 December 2026/);
  });
});

describe("cohort config integrity", () => {
  it("has 5 phases covering 12 weeks and 6 selection stages", () => {
    expect(COHORT.phases).toHaveLength(5);
    expect(COHORT.selectionStages).toHaveLength(6);
    expect(COHORT.programDurationWeeks).toBe(12);
    expect(COHORT.numberOfCompanies).toBe(10);
  });

  it("never hardcodes unresolved legal terms", () => {
    const text = JSON.stringify(COHORT).toLowerCase();
    // no invented instruments or equity percentages
    expect(text).not.toMatch(/\bsafe\b|isafe|ccps|ccd\b|valuation cap/);
    expect(text).not.toMatch(/\d+\s*%\s*equity/);
  });
});
