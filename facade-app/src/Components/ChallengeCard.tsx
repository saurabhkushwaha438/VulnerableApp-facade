import React, { useState } from "react";
import { Challenge } from "../interface/State";
import { Panel as RSuitePanel, Button } from "rsuite";
import "rsuite/dist/styles/rsuite-default.min.css";

// Interface definitions to map to the new mock json
interface Hint {
  order: number;
  text: string;
}

export interface ChallengeCardProps {
  challenge: Challenge & { hints?: Hint[] };
  challengeNumber?: number;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  challengeNumber,
}) => {
  const [revealedHints, setRevealedHints] = useState(0);

  const handleShowHint = () => {
    setRevealedHints((prev) => prev + 1);
  };

  const handleHideHint = () => {
    setRevealedHints((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const headerText = challengeNumber
    ? `Challenge ${challengeNumber}`
    : "Challenge";

  // Backwards compatibility with the old hintCards format
  let hints = challenge.hints || [];
  if (hints.length === 0 && (challenge as any).hintCards) {
    hints = (challenge as any).hintCards
      .flatMap((hc: any) => hc.hints)
      .map((text: string, index: number) => ({
        order: index + 1,
        text,
      }));
  }

  return (
    <RSuitePanel
      header={
        <span
          style={{ color: "#0d325e", fontSize: "18px", fontWeight: "bold" }}
        >
          <span style={{ marginRight: "10px" }}>🧩</span>
          {headerText}
        </span>
      }
      className="VulnerableApp-Facade-Content-Challenge-Card"
      collapsible={true}
      defaultExpanded={true}
      bordered
      style={{
        opacity: 1,
        filter: "none",
        backgroundColor: "white",
        color: "#333",
        borderColor: "#e1e4e8",
      }}
    >
      <div
        className="challenge-text"
        style={{ fontSize: "15px", color: "#333", marginBottom: "15px" }}
      >
        <p>{challenge.challengeText}</p>
      </div>

      {hints.length > 0 && revealedHints > 0 && (
        <div
          style={{
            backgroundColor: "#fffdee",
            border: "1px solid #f6eed6",
            borderRadius: "4px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              padding: "10px 15px",
              borderBottom: "1px solid #f6eed6",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            💡 Hint
          </div>
          <div className="challenge-hints-section" style={{ padding: "15px" }}>
            <ul style={{ color: "#333", paddingLeft: "20px", margin: 0 }}>
              {hints.slice(0, revealedHints).map((hint, hIndex) => (
                <li
                  key={hIndex}
                  dangerouslySetInnerHTML={{ __html: hint.text }}
                  style={{ marginBottom: "5px" }}
                />
              ))}
            </ul>

            {revealedHints === hints.length && challenge.payload && (
              <div
                style={{
                  marginTop: "15px",
                  padding: "10px",
                  backgroundColor: "#f6f8fa",
                  border: "1px solid #e1e4e8",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ marginRight: "8px" }}>🧪</span>
                <strong>Payload: </strong>
                <code
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "transparent",
                    padding: 0,
                  }}
                >
                  {challenge.payload.value}
                </code>
              </div>
            )}
          </div>
        </div>
      )}

      {hints.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "15px",
          }}
        >
          {revealedHints > 0 ? (
            <Button
              appearance="link"
              onClick={handleHideHint}
              style={{ padding: 0 }}
            >
              Hide Hint
            </Button>
          ) : (
            <div />
          )}

          {revealedHints < hints.length && (
            <Button
              appearance="ghost"
              onClick={handleShowHint}
              style={{
                color: "#333",
                borderColor: "#ccc",
                borderRadius: "4px",
              }}
            >
              Show Hint &gt;
            </Button>
          )}
        </div>
      )}

      {!hints.length && challenge.payload && (
        <div
          style={{
            marginTop: "15px",
            padding: "10px",
            backgroundColor: "#f6f8fa",
            border: "1px solid #e1e4e8",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ marginRight: "8px" }}>🧪</span>
          <strong>Payload: </strong>
          <code style={{ marginLeft: "10px" }}>{challenge.payload.value}</code>
        </div>
      )}
    </RSuitePanel>
  );
};
