import React, { useState } from "react";
import { Challenge } from "../interface/State";
import { Panel as RSuitePanel, Button } from "rsuite";
import "rsuite/dist/styles/rsuite-default.min.css";
import "../styles/ChallengeCard.css";
import DOMPurify from "dompurify";

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
  const [isPayloadRevealed, setIsPayloadRevealed] = useState(false);

  const handleShowHint = () => {
    setRevealedHints((prev) => prev + 1);
  };

  const handleHideHint = () => {
    setRevealedHints((prev) => (prev > 0 ? prev - 1 : 0));
    setIsPayloadRevealed(false);
  };

  const handleShowPayload = () => {
    setIsPayloadRevealed(true);
  };

  const headerText = challengeNumber
    ? `Challenge ${challengeNumber}`
    : "Challenge";

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
        <span className="challenge-card-header">
          <span className="challenge-card-icon">🧩</span>
          {headerText}
        </span>
      }
      className="VulnerableApp-Facade-Content-Challenge-Card challenge-card-panel"
      defaultExpanded={true}
      bordered
    >
      <div className="challenge-text">
        <p>{challenge.challengeText}</p>
      </div>

      {hints.length > 0 && revealedHints > 0 && (
        <div className="hint-container">
          <div className="hint-header">💡 Hint</div>
          <div className="challenge-hints-section">
            <ul className="hint-list">
              {hints.slice(0, revealedHints).map((hint, hIndex) => (
                <li
                  key={hIndex}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(hint.text),
                  }}
                  className="hint-list-item"
                />
              ))}
            </ul>

            {revealedHints === hints.length && challenge.payload && (
              <div className="payload-wrapper">
                {!isPayloadRevealed ? (
                  <Button
                    appearance="primary"
                    onClick={handleShowPayload}
                    className="btn-reveal-payload"
                  >
                    Reveal Payload
                  </Button>
                ) : (
                  <div className="payload-container">
                    <span className="payload-icon">🧪</span>
                    <strong>Payload: </strong>
                    <code className="payload-code">
                      {challenge.payload.value}
                    </code>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {hints.length > 0 && (
        <div className="action-buttons-container">
          {revealedHints > 0 ? (
            <Button
              appearance="link"
              onClick={handleHideHint}
              className="btn-hide-hint"
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
              className="btn-show-hint"
            >
              Show Hint &gt;
            </Button>
          )}
        </div>
      )}

      {!hints.length && challenge.payload && (
        <div className="payload-wrapper">
          {!isPayloadRevealed ? (
            <Button
              appearance="primary"
              onClick={handleShowPayload}
              className="btn-reveal-payload"
            >
              Reveal Payload
            </Button>
          ) : (
            <div className="payload-container">
              <span className="payload-icon">🧪</span>
              <strong>Payload: </strong>
              <code className="payload-code">{challenge.payload.value}</code>
            </div>
          )}
        </div>
      )}
    </RSuitePanel>
  );
};
