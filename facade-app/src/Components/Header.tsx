import React from "react";
import VulnerableAppLogo from "../images/Logo.png";

import {
  Header as RSuiteHeader,
  Navbar as RSuiteNavBar,
  Nav as RSuiteNav,
  Icon as RSuiteIcon,
  Dropdown as RSuiteDropDown,
} from "rsuite";

import { Props } from "../interface/Props";
import {
  ApplicationState,
  VulnerabilityDefinition,
  LevelInformation,
  AppMode,
} from "../interface/State";
import "../styles/Header.css";

export default class Header extends React.Component<Props, {}> {
  private isChallengeAvailable = (): boolean => {
    const { globalState } = this.props;
    const {
      activeApplication,
      applicationData,
      activeVulnerability,
      activeLevel,
    } = globalState;

    if (!applicationData) return false;

    const app = applicationData.find(
      (a: ApplicationState) => a.applicationName === activeApplication
    );
    if (!app) return false;

    const vuln = app.vulnerabilityDefinitions?.find(
      (v: VulnerabilityDefinition) => v.id === activeVulnerability
    );
    if (!vuln) return false;

    const level = vuln.levels?.find(
      (l: LevelInformation) => l.levelIdentifier === activeLevel
    );
    if (!level) return false;

    const challengeCards =
      level.challengeCards || (level.challenge ? [level.challenge] : []);
    return challengeCards.length > 0;
  };

  render() {
    const { globalState, setGlobalState } = this.props;

    const isOnLevelPage = !!(
      globalState.activeApplication &&
      globalState.activeVulnerability &&
      globalState.activeLevel &&
      !globalState.activateHomePage &&
      !globalState.activateAboutUsPage
    );

    const challengeAvailable = isOnLevelPage
      ? this.isChallengeAvailable()
      : false;
    const isChallengeDisabled = isOnLevelPage && !challengeAvailable;

    const effectiveMode =
      globalState.isChallengeModeEnabled && !isChallengeDisabled
        ? AppMode.CHALLENGE
        : AppMode.SCANNER;

    return (
      <div className="header-container">
        <RSuiteHeader>
          <RSuiteNavBar appearance="inverse">
            <RSuiteNavBar.Header>
              <img
                src={VulnerableAppLogo}
                width="55"
                height="55"
                alt="vulnerable app logo"
              />
            </RSuiteNavBar.Header>

            <RSuiteNavBar.Body>
              <RSuiteNav>
                <RSuiteNav.Item
                  onSelect={() =>
                    setGlobalState({
                      ...globalState,
                      activateHomePage: true,
                      activateAboutUsPage: false,
                    })
                  }
                >
                  <b>Owasp VulnerableApp-Facade</b>
                </RSuiteNav.Item>
              </RSuiteNav>

              <RSuiteNav pullRight>
                <RSuiteNav.Item className="mode-nav-item">
                  <div className="mode-toggle-wrapper">
                    <div className="mode-toggle-container">
                      {/* Challenge Mode */}
                      <button
                        disabled={isChallengeDisabled}
                        onClick={() =>
                          setGlobalState({
                            ...globalState,
                            isChallengeModeEnabled: true,
                          })
                        }
                        className={`mode-button challenge-btn ${
                          effectiveMode === AppMode.CHALLENGE
                            ? "mode-button-active"
                            : ""
                        } ${isChallengeDisabled ? "mode-button-disabled" : ""}`}
                      >
                        Challenge Mode
                      </button>

                      {/* Scanner Mode */}
                      <button
                        onClick={() =>
                          setGlobalState({
                            ...globalState,
                            isChallengeModeEnabled: false,
                          })
                        }
                        className={`mode-button scanner-btn ${
                          effectiveMode === AppMode.SCANNER
                            ? "mode-button-active"
                            : ""
                        }`}
                      >
                        Scanner Mode
                      </button>
                    </div>
                  </div>
                </RSuiteNav.Item>

                <RSuiteNav.Item
                  onSelect={() =>
                    setGlobalState({
                      ...globalState,
                      activateHomePage: true,
                      activateAboutUsPage: false,
                    })
                  }
                  icon={<RSuiteIcon icon="home" role={"img"} />}
                >
                  Home
                </RSuiteNav.Item>

                <RSuiteNav.Item
                  onSelect={() =>
                    setGlobalState({
                      ...globalState,
                      activateHomePage: false,
                      activateAboutUsPage: true,
                    })
                  }
                >
                  About Us
                </RSuiteNav.Item>

                <RSuiteDropDown title="Scanners">
                  <RSuiteDropDown.Item
                    href="../scanner/dast"
                    title="Dynamic Application Security Testing"
                  >
                    DAST
                  </RSuiteDropDown.Item>

                  <RSuiteDropDown.Item
                    href="../scanner/sast"
                    title="Static Application Security Testing"
                  >
                    SAST
                  </RSuiteDropDown.Item>
                </RSuiteDropDown>

                <RSuiteNav.Item
                  href="https://github.com/SasanLabs/VulnerableApp-facade"
                  icon={<RSuiteIcon icon="github" role={"img"} />}
                >
                  Github
                </RSuiteNav.Item>

                <RSuiteDropDown title="Projects by SasanLabs">
                  <RSuiteDropDown.Item
                    href="https://github.com/SasanLabs/VulnerableApp"
                    icon={<RSuiteIcon icon="github" role={"img"} />}
                  >
                    Owasp VulnerableApp
                  </RSuiteDropDown.Item>

                  <RSuiteDropDown.Item
                    href="https://github.com/SasanLabs/LLMForge"
                    icon={<RSuiteIcon icon="github" role={"img"} />}
                  >
                    LLMForge
                  </RSuiteDropDown.Item>

                  <RSuiteDropDown.Item
                    href="https://github.com/SasanLabs/SAFE"
                    icon={<RSuiteIcon icon="github" role={"img"} />}
                  >
                    Security Awareness for Everyone
                  </RSuiteDropDown.Item>

                  <RSuiteDropDown.Item
                    href="https://github.com/SasanLabs/owasp-zap-jwt-addon"
                    icon={<RSuiteIcon icon="github" role={"img"} />}
                  >
                    ZAP JWT Addon
                  </RSuiteDropDown.Item>

                  <RSuiteDropDown.Item
                    href="https://github.com/SasanLabs/owasp-zap-fileupload-addon"
                    icon={<RSuiteIcon icon="github" role={"img"} />}
                  >
                    ZAP FileUpload Addon
                  </RSuiteDropDown.Item>
                </RSuiteDropDown>
              </RSuiteNav>
            </RSuiteNavBar.Body>
          </RSuiteNavBar>
        </RSuiteHeader>
      </div>
    );
  }
}
