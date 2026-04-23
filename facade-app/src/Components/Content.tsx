import React from "react";
import { LevelInformation } from "../interface/State";
import { Panel as RSuitePanel } from "rsuite";
import { ChallengeCard } from "./ChallengeCard";
import {
  appendStaticResourcesToDocument,
  getResource,
  manipulateDOM,
} from "../Utilities/Utils";
import { VulnerabilityDefinitionResponse } from "../interface/GeneralContracts";
import { HomePage } from "./HomePage";
import AboutUs from "./AboutUs";
import { Props } from "../interface/Props";

interface ContentState {
  description?: string;
}

export class Content extends React.Component<Props, ContentState> {
  selectedLevel?: LevelInformation;

  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.globalState.activeLevel !==
        this.props.globalState.activeLevel ||
      prevProps.globalState.activeVulnerability !==
        this.props.globalState.activeVulnerability ||
      prevProps.globalState.activeApplication !==
        this.props.globalState.activeApplication
    ) {
      const {
        activeApplication,
        applicationData,
        activeVulnerability,
        activeLevel,
      } = this.props.globalState;
      const selectedApplicationState = applicationData?.find(
        (applicationState) =>
          applicationState.applicationName === activeApplication
      );
      if (selectedApplicationState) {
        const selectedVulnerability =
          selectedApplicationState.vulnerabilityDefinitions.find(
            (vulnerabilityDefinition) =>
              vulnerabilityDefinition.id === activeVulnerability
          );
        this.setState({ description: selectedVulnerability?.description });
        if (selectedVulnerability) {
          const selectedLevel = selectedVulnerability.levels.find(
            (level) => level.levelIdentifier === activeLevel
          );
          if (selectedLevel) {
            this.selectedLevel = selectedLevel;
            getResource(
              selectedLevel.resourceInformation.htmlResource.uri,
              this._setLocalState.bind(this),
              false
            );
          }
        }
      }
    }
  }

  _setLocalState(
    vulnerabilityDefinitionResponse: VulnerabilityDefinitionResponse
  ) {
    if (vulnerabilityDefinitionResponse.data) {
      manipulateDOM("__content__", vulnerabilityDefinitionResponse.data);
      if (this.selectedLevel) {
        appendStaticResourcesToDocument(this.selectedLevel);
      }
    }
  }

  render() {
    const {
      activeVulnerability,
      activateHomePage,
      activateAboutUsPage,
      showHints,
      isChallengeModeEnabled,
    } = this.props.globalState;
    const { setGlobalState } = this.props;

    const challengeCards =
      this.selectedLevel?.challengeCards ||
      (this.selectedLevel?.challenge ? [this.selectedLevel.challenge] : []);

    // THE FALLBACK LOGIC:
    // Even if global mode is Challenge, if there's no data, it falls back to Scanner.
    const isChallengeAvailable = challengeCards.length > 0;
    const showChallengeMode = isChallengeModeEnabled && isChallengeAvailable;

    return (
      <div className="VulnerableApp-Facade-Info">
        {activateHomePage ? (
          <HomePage></HomePage>
        ) : activateAboutUsPage ? (
          <AboutUs></AboutUs>
        ) : (
          <div className="VulnerableApp-Facade-Content-Container">
            {/* Main Content Area */}
            {activeVulnerability && (
              <div>
                {/* 1. Vulnerability Description (Scanner Mode Only) */}
                {!showChallengeMode && (
                  <RSuitePanel
                    header="Vulnerability Description"
                    className="VulnerableApp-Facade-Content-Vulnerability-Description-Header"
                    collapsible={true}
                    defaultExpanded={true}
                  >
                    <div className="VulnerableApp-Facade-Content"  data-testid="VULNERABILITY_CONTENT_DESCRIPTION">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: this.state?.description || "",
                        }}
                      />
                    </div>
                  </RSuitePanel>
                )}

                {/* 2. Practice Vulnerability (Always displayed) */}
                <RSuitePanel
                  header="Practice Vulnerability"
                  className="VulnerableApp-Facade-Content-Practice-Vulnerability-Header"
                >
                  <div className="VulnerableApp-Facade-Content">
                    <div
                      id="__content__"
                      data-testid={"VULNERABILITY_MAIN_CONTENT"}
                    />
                  </div>
                </RSuitePanel>

                {/* 3. Challenge Cards (Challenge Mode Only) */}
                {showChallengeMode && (
                  <div style={{ marginTop: "15px" }}>
                    {challengeCards.map((challenge, index) => (
                      <div key={index} style={{ marginBottom: "15px" }}>
                        <ChallengeCard
                          challenge={challenge}
                          challengeNumber={index + 1}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* 4. Hints (Scanner Mode Only) */}
                {!showChallengeMode &&
                  this.selectedLevel &&
                  this.selectedLevel.hints &&
                  this.selectedLevel.hints.length > 0 && (
                    <RSuitePanel
                      header="Hints"
                      className="VulnerableApp-Facade-Content-Hint-Content"
                      collapsible={true}
                      defaultExpanded={false}
                      expanded={showHints}
                      onSelect={() =>
                        setGlobalState({
                          ...this.props.globalState,
                          showHints: !showHints,
                        })
                      }
                      style={{ marginTop: "15px" }}
                    >
                      <ol data-testid={"VULNERABILITY_HINTS"}>
                        {this.selectedLevel.hints.map((hint, index) => {
                          return (
                            <li
                              key={index}
                              dangerouslySetInnerHTML={{
                                __html: hint.description,
                              }}
                            />
                          );
                        })}
                      </ol>
                    </RSuitePanel>
                  )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
