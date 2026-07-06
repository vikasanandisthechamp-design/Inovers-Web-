import { describe, it, expect } from "vitest";
import {
  STEPS,
  stepSchemas,
  validateStep,
  validateAll,
  generateApplicationCode,
} from "../application";

const validFounder = {
  fullName: "Asha Verma",
  email: "asha@example.com",
  phone: "+91 98765 43210",
  city: "Patna",
  linkedin: "",
  portfolio: "",
  founderStatus: "team",
  commitment: "full_time_if_selected",
} as const;

describe("application steps", () => {
  it("defines fields/schema for all 10 steps in order", () => {
    expect(STEPS).toHaveLength(10);
    for (const s of STEPS) {
      expect(stepSchemas[s.key]).toBeDefined();
    }
    expect(STEPS.map((s) => s.code)).toEqual([
      "01","02","03","04","05","06","07","08","09","10",
    ]);
  });
});

describe("validateStep", () => {
  it("accepts a valid founder step", () => {
    expect(validateStep("founder", validFounder)).toEqual({});
  });

  it("rejects bad email and phone with field-level errors", () => {
    const errs = validateStep("founder", {
      ...validFounder,
      email: "not-an-email",
      phone: "abc",
    });
    expect(errs.email).toBeTruthy();
    expect(errs.phone).toBeTruthy();
    expect(errs.fullName).toBeUndefined();
  });

  it("treats empty draft as invalid, not crashing", () => {
    const errs = validateStep("building", undefined);
    expect(Object.keys(errs).length).toBeGreaterThan(0);
  });

  it("allows optional URLs to be empty but validates when present", () => {
    expect(validateStep("video", { videoUrl: "" })).toEqual({});
    expect(validateStep("video", { videoUrl: "https://youtu.be/x" })).toEqual({});
    expect(validateStep("video", { videoUrl: "nope" }).videoUrl).toBeTruthy();
  });
});

describe("validateAll", () => {
  it("reports errors per incomplete step", () => {
    const out = validateAll({ founder: validFounder });
    expect(out.founder).toBeUndefined();
    expect(out.company).toBeDefined();
    expect(out.insight).toBeDefined();
  });
});

describe("generateApplicationCode", () => {
  it("produces INV01-XXXXXX codes without ambiguous characters", () => {
    const code = generateApplicationCode();
    expect(code).toMatch(/^INV01-[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{6}$/);
  });

  it("is deterministic given a seeded random", () => {
    const fixed = () => 0.5;
    expect(generateApplicationCode(fixed)).toBe(generateApplicationCode(fixed));
  });
});
