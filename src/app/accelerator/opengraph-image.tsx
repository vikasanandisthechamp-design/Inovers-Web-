import { ImageResponse } from "next/og";
import { COHORT, getStatusUi } from "@/lib/accelerator/config";

export const alt =
  "Inovers Accelerator — Build What the Future Needs. 12 weeks, 10 startups, up to ₹5 lakh investment.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const status = getStatusUi();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#141109",
          color: "#f0ead9",
          padding: "64px 72px",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 6 }}>
            INOVERS{" "}
            <span style={{ color: "#ff5a1f", marginLeft: 16 }}>ACCELERATOR</span>
          </div>
          <div
            style={{
              display: "flex",
              border: "1px solid rgba(240,234,217,0.35)",
              padding: "10px 18px",
              fontSize: 18,
              letterSpacing: 3,
            }}
          >
            {COHORT.cohortCode} · {status.pill}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: -2,
          }}
        >
          <span>BUILD WHAT</span>
          <span>
            THE FUTURE <span style={{ color: "#ff5a1f", marginLeft: 20 }}>NEEDS.</span>
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(240,234,217,0.25)",
            paddingTop: 28,
            fontSize: 24,
            letterSpacing: 3,
          }}
        >
          <span>{COHORT.numberOfCompanies} STARTUPS</span>
          <span>{COHORT.programDurationWeeks} WEEKS</span>
          <span style={{ color: "#ff5a1f" }}>UP TO ₹5,00,000</span>
          <span>NO APPLICATION FEE</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
